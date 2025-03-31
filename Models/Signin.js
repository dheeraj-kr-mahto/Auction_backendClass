const mongoose = require("mongoose");

const SigninSchema = mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SigninModel = mongoose.model("Signin", SigninSchema);
module.exports = SigninModel;
