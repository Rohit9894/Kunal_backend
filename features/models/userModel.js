const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {

    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    amount: { type: Number },
    address: { type: String },
    phone: { type: Number },
    isClose: { type: Boolean }

  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
