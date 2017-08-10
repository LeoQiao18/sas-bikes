const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema({
  owner: {
    firstName: { type: String },
    lastName: { type: String }
  },
  color: { type: String },
  brand: { type: String },
  description: { type: String }
});

mongoose.model('bikes', bikeSchema);