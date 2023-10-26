const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = {
//--------------------------------------------//Create Conversation//------------------------------------------//
    createConversation: catchAsyncErrors(async(req, res, next) => {
        try {
            const { groupTitle, userId, sellerId } = req.body

            // Check If The Conversation Already Exists
            const isConversationExists = await Conversation.findOne({groupTitle})

             // Only Create The Conversation If It Does Not Exist
            if(isConversationExists) {
             const conversation = isConversationExists
               res.status(201).json({
                success: true,
                conversation
               })
            } else {
             const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle
              })

             res.status(201).json({
                success: true,
                conversation
              })
            }
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
    }),

//-----------------------------------------//Get All Seller Conversations//--------------------------------------//
getSellerConversations: catchAsyncErrors(async(req, res, next) => {
  try {
    const conversations = await Conversation.find({members: {
      $in: [req.params.id]
    }}).sort({ updatedAt: -1, createdAt: -1 })

    res.status(201).json({
      success: true,
      conversations
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

}