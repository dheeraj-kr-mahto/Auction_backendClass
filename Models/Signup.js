const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const SignupModel = mongoose.model("Signup", SignupSchema);
module.exports = SignupModel;
