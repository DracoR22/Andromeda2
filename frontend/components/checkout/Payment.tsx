'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation"
import styles from "@/styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify";

const Payment = () => {

const [orderData, setOrderData] = useState<any>([]);
const [open, setOpen] = useState(false);
const { user } = useSelector((state: any) => state.user);
const router = useRouter()
const stripe = useStripe();
const elements = useElements();

useEffect(() => {
 const orderData = localStorage.getItem("latestOrder");
  if (orderData) {
    setOrderData(JSON.parse(orderData));
  }
}, [])

// ORDER DATA
const order: any = {
  cart: orderData?.cart,
  shippingAddress: orderData?.shippingAddress,
  user: user && user,
  totalPrice: orderData?.totalPrice,
};

// CREATE PAYPAL ORDER (PAYPAL)
const createOrder = (data: any, actions: any) => {
  return actions.order.create({
    purchase_units: [
      {
        description: "Sunflower",
        amount: {
          currency_code: "USD",
          value: orderData?.totalPrice,
        },
      },
    ],
    // not needed if a shipping address is actually needed
    application_context: {
      shipping_preference: "NO_SHIPPING",
    },
  })
  .then((orderID: string) => {
    return orderID;
  });
}

// PAYPAL APPROVE HANDLER (PAYPAL)
const onApprove = (data: any, actions: any) => {
  return actions.order.capture().then(function (details: any) {
    const { payer } = details;

    let paymentInfo = payer;

    if (paymentInfo !== undefined) {
      paypalPaymentHandler(paymentInfo);
    }
  });
}

// CREATE ORDER WITH PAYPAL (PAYPAL)
const paypalPaymentHandler = async (paymentInfo: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  order.paymentInfo = {
    id: paymentInfo.payer_id,
    status: "succeeded",
    type: "Paypal",
  };

  await axios
    .post(`${server}/order/create-order`, order, config)
    .then((res) => {
      setOpen(false);
      router.push("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
};


// CREATE STRIPE PAYMENT AND ORDER (STRIPE)
const paymentHandler = async (e: any) => {
  e.preventDefault()
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${server}/payment/process`, paymentData, config);

    const client_secret = data.client_secret;

    if (!stripe || !elements) return;
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      // Handle the case where cardNumberElement is null
      return;
    }
    
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardNumberElement,
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        order.paymnentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "Credit Card",
        };

        await axios.post(`${server}/order/create-order`, order, config)
          .then((res) => {
            setOpen(false);
            router.push("/order/success");
            toast.success("Order successful!");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            window.location.reload();
          });
      }
    }
  } catch (error) {
    
  }
}

const paymentData = {
  amount: Math.round(orderData?.totalPrice * 100),
};

// PAY WITH CASH
const cashOnDeliveryHandler = async (e: any) => {
  e.preventDefault();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  order.paymentInfo = {
    type: "Cash On Delivery",
  };

  await axios
  .post(`${server}/order/create-order`, order, config)
  .then((res) => {
    setOpen(false);
    router.push("/order/success");
    toast.success("Order successful!");
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("latestOrder", JSON.stringify([]));
    window.location.reload();
  });
}

  return (
    <div className="w-full flex flex-col items-center py-8">
    <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
      <div className="w-full 800px:w-[65%]">
        <PaymentInfo
          user={user}
          open={open}
          setOpen={setOpen}
          onApprove={onApprove}
          createOrder={createOrder}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
        />
      </div>
      <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
        <CartData orderData={orderData} />
      </div>
    </div>
  </div>
  )
}

interface PaymentInfoProps {
  user: any
  open: boolean
  setOpen: any
  onApprove: any,
  createOrder: any,
  paymentHandler: any
  cashOnDeliveryHandler: any
}

const PaymentInfo = ({ user, open, setOpen, onApprove, createOrder, paymentHandler, cashOnDeliveryHandler }: PaymentInfoProps) => {
  
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* STRIPE PAYMENT*/}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2 font-semibold">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-semibold">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2 font-semibold">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                         
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-semibold">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                         
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`bg-[#f63b60] hover:bg-[#ad495d] transition text-[#fff] rounded-full cursor-pointer px-6 p-2 mb-3 font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* PAYPAL PAYMENT */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`bg-[#f63b60] hover:bg-[#ad495d] transition text-[#fff] rounded-full cursor-pointer px-6 p-2 mb-3 font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                    <PayPalScriptProvider
                    //@ts-ignore
                      options={{
                        "client-id": "AQ-yALwlvwcB1jQsAWVwl2Hoi-su9gWVxGUCtkd1cnrLxWHZvVHX_RP9L-z2C_y-XeQoxN1i5R2C5v7N",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* CASH ON DELIVERY */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* CASH ON DELIVERY */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`bg-[#f63b60] hover:bg-[#ad495d] transition text-[#fff] rounded-full cursor-pointer px-6 p-2 mb-3 font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface CartDataProps {
    orderData: any
}

const CartData = ({ orderData }: CartDataProps) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          ${orderData?.totalPrice}
        </h5>
        <br />
      </div>
    );
  };

export default Payment
