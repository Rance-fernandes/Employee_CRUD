const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "please add the username"] },
  email: { type: String, required: [true, "please add the email"] },
  password: { type: String, required: [true, "please add the password"] },
},{
  timestamps:true,
});

module.exports = mongoose.model("User", UserSchema);
