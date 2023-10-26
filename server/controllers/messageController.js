const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler");
const Message = require("../model/message")

module.exports = {
//--------------------------------------------//Create New Message//------------------------------------------//
createMessage: catchAsyncErrors(async(req, res, next) => {
    try {
        const messageData = req.body;

        if (req.body.images) {
          const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "messages",
          });
          messageData.images = {
            public_id: myCloud.public_id,
            url: myCloud.url,
          };
        }
  
        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;
  
        const message = new Message({
          conversationId: messageData.conversationId,
          text: messageData.text,
          sender: messageData.sender,
          images: messageData.images ? messageData.images : undefined,
        });
  
        await message.save();
  
        res.status(201).json({
          success: true,
          message,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
}