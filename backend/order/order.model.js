const mongoose = require("mongoose");
const { CustomerObject } = require("../customer/customer.model");
const { BarangObject } = require("../barang/barang.model");

const OrderObject = {
  nomor: { type: String, unique: true },
  tanggal: { type: Date, required: true },
  customer: new mongoose.Schema({
    ...CustomerObject,
    nomor: { type: String, required: true },
  }),
  dibayar: { type: Number, required: true },
  total: { type: Number, required: true },
  items: [
    new mongoose.Schema({
      ...BarangObject,
      nomor: { type: String, required: true },
      qty: { type: Number, required: true, default: 1 },
      subtotal: { type: Number, required: true },
    }),
  ],
};

const OrderSchema = new mongoose.Schema(OrderObject);

const OrderModel = new mongoose.model("Order", OrderSchema);

module.exports = {
  OrderObject,
  OrderSchema,
  OrderModel,
};
