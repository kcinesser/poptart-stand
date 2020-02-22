const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poptartSchema = new Schema({
  flavor: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  orders: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  descript: { type: String, default: "Someone was too lazy to add a description."}
});

const Poptart = mongoose.model('Poptart', poptartSchema);

module.exports = Poptart;