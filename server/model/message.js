const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);