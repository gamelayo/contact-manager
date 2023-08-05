const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
    },
    phone: {
      type: Number,
      required: [true, "please add a phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
