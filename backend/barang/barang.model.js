const mongoose = require("mongoose");

const BarangObject = {
  nomor: { type: String, unique: true },
  nama: { type: String },
  satuan: { type: String },
  hargaJual: { type: Number },
  stok: { type: Number },
};

const BarangSchema = new mongoose.Schema(BarangObject);

const BarangModel = new mongoose.model("Barang", BarangSchema);

module.exports = {
  BarangObject,
  BarangSchema,
  BarangModel,
};
