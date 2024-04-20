const { BarangModel } = require("../barang/barang.model");
const { Error404, Error403 } = require("../libs/lib.exception");

const CheckItems = async (cleanedData) => {
  let total = 0;
  for (let item of cleanedData.items) {
    const barang = await BarangModel.findOne({ _id: item._id });
    if (!barang) {
      throw new Error403(
        "Salah satu item tidak tesedia, permintaan ditolak untuk diproses!"
      );
    }

    let subtotal = barang.hargaJual * item.qty;
    if (subtotal !== item.subtotal) {
      throw new Error403(
        "Subtotal tidak valid, permintaan ditolak untuk diproses!"
      );
    }
    total += barang.hargaJual * item.qty;
  }

  if (!(total === cleanedData.total)) {
    throw new Error403("Total tidak valid, permintaan ditolak untuk diproses!");
  }

  return total;
};

module.exports = {
  CheckItems,
};
