const mongoose = require("mongoose");

const KasObject = {
  nomor: { type: String, required: true },
  jumlah_keluar: { type: String, required: true },
  jumlah_masuk: { type: String, required: true },
  tanggal: { type: Date, required: true },
};

const KasSchema = new mongoose.Schema(KasObject);

const KasModel = new mongoose.model("Kas", KasSchema);

module.exports = {
  KasObject,
  KasSchema,
  KasModel,
};
