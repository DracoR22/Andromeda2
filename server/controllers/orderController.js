const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../model/order")
const Product = require("../model/product")
const Shop = require("../model/shop")

module.exports = {
//-----------------------------------------//Create Order For Each Shop//----------------------------------------//
    createOrder: catchAsyncErrors(async(req, res, next) => {
        try {
            const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body

            // Get Cart Items By Shop Id
            const shopItemsMap = new Map()

            for(const item of cart) {
               const shopId = item.shopId
               if(!shopItemsMap.has(shopId)) {
                shopItemsMap.set(shopId, [])
               }
               shopItemsMap.get(shopId).push(item)
             }

            // Create An Order For Each Shop
            const orders = [];

            for (const [shopId, items] of shopItemsMap) {
              const order = await Order.create({
              cart: items,
              shippingAddress,
              user,
              totalPrice,
              paymentInfo,
              });
             orders.push(order);
              }

            res.status(201).json({
            success: true,
            orders,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }),

//-------------------------------------------//Get Each User Orders//------------------------------------------//
allOrders: catchAsyncErrors(async(req, res, next) => {
  try {
    const orders = await Order.find({"user._id": req.params.userId}).sort({ createdAt: -1 })

    res.status(201).json({
      success: true,
      orders
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-------------------------------------------//Get All Seller Orders//------------------------------------------//
sellerOrders: catchAsyncErrors(async(req, res, next) => {
  try {
    const orders = await Order.find({"cart.shopId": req.params.shopId}).sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),


//--------------------------------------------//Update Order Status//-------------------------------------------//
updateOrderStatus: catchAsyncErrors(async(req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    if (req.body.status === "Transfered to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * .10;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Shop.findById(req.seller.id);
      
      seller.availableBalance = seller.availableBalance + amount;

      await seller.save();
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-------------------------------------------//Request A Refund (User)//-----------------------------------------//
requestRefund: catchAsyncErrors(async(req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      order,
      message: "Refund request placed!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-------------------------------------------//Accept Refund (Seller)//-----------------------------------------//
acceptRefund: catchAsyncErrors(async(req, res, next) => {
  try {
    const order = await Order.findById( req.params.id )
    if(!order) {
      return next(new ErrorHandler("Order not found", 400))
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Refund successfull!",
    });

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//----------------------------------------------//Get All Orders//---------------------------------------------//
getAllOrdersAdmin: catchAsyncErrors(async(req, res, next) => {
  try {
    const orders = await Order.find().sort({deliveredAt: -1, createdAt: -1 })

    res.status(201).json({
      success: true,
      orders
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
}