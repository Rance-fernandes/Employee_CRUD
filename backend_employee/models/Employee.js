const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userId:{type:String},
  id:{type: Number, unique:true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  education: { type: String, required: true },
  company: { type: String, required: true },
  experience: { type: Number, required: true },
  package: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
