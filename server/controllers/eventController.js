const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../model/event");
const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary")

module.exports = {
//------------------------------------------------//Create Event//---------------------------------------------//
createEvent: catchAsyncErrors(async(req, res, next) => {
    try {
          // Get The Shop
          const shopId = req.body.shopId
          const shop = await Shop.findById(shopId)
  
          if(!shop) {
              return next(new ErrorHandler("Shop Id is missing", 400));
          } else {
              // Upload Images
              let images = []
  
              if (typeof req.body.images === "string") {
                  images.push(req.body.images);
                } else {
                  images = req.body.images;
                }
              
                const imagesLinks = [];
  
              for (let i = 0; i < images.length; i++) {
                  const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "events",
                  });
              
                  imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                  });
                }
  
                // Extract Everything From req.body
                const eventData = req.body;
                // Set The Event Images To Be Our Array
                eventData.images = imagesLinks;
                // Set The Event Shop To Our Shop Variable
                eventData.shop = shop;
  
                // Create The Event
                const event = await Event.create(eventData)
  
                res.status(201).json({
                  success: true,
                  event,
                });
          }
    } catch (error) {
       return next(new ErrorHandler(error.message, 500));
    }
}),

//--------------------------------------------//Get All Shop Events//------------------------------------------//
getAllEventProducts: catchAsyncErrors(async(req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id })

    res.status(201).json({
      success: true,
      events
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),
//------------------------------------------------//Delete Event//----------------------------------------------//
deleteEvent: catchAsyncErrors(async(req, res, next) => {
  try {
    // Get Event By Id Using Params
    const eventId = req.params.id

    const event = await Event.findByIdAndDelete(eventId)

    if(!event) {
      return next(new ErrorHandler("Event not found", 400));
    }

    // Remove All Images From Cloudinary
    for (let i = 0; i < event.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        event.images[i].public_id
      );
    }

    res.status(201).json({
      success: true,
      message: "Event has been deleted"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//------------------------------------------------//Get All Events//----------------------------------------------//
allEvents: catchAsyncErrors(async(req, res, next) => {
  try {
    const events = await Event.find()

    res.status(201).json({
      success: true,
      events
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}),

//-------------------------------------------//Get All Events (Admin)//-----------------------------------------//
adminAllEvents: catchAsyncErrors(async(req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 })

    res.status(201).json({
      success: true,
      events
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
}