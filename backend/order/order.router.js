const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { OrderCreate, OrderDetail, OrderList } = require("./order.controller");
const {
  OrderNomorValidator,
  OrderTanggalValidator,
  OrderCustomerValidator,
  OrderItemsValidator,
  OrderItemsQtyValidator,
  OrderItemsSubtotalValidator,
} = require("./order.validation");
const {
  CustomerNomorValidator,
  CustomerNamaValidator,
  CustomerAlamatValidator,
  CustomerTeleponValidator,
  CustomerIDValidator,
} = require("../customer/customer.validation");
const {
  BarangNomorValidator,
  BarangNamaValidator,
  BarangSatuanValidator,
  BarangHargaJualValidator,
  BarangStokValidator,
  BarangIDValidator,
} = require("../barang/barang.validation");

const OrderRouter = express.Router();

OrderRouter.get("/", [IsAuthenticated], OrderList);
OrderRouter.post(
  "/",
  [
    IsAuthenticated,
    Validate([
      OrderNomorValidator(),
      OrderTanggalValidator(),
      OrderCustomerValidator(),
      CustomerNomorValidator(false, false, true, "customer.nomor"),
      CustomerIDValidator(false, "customer._id"),
      CustomerNamaValidator(false, "customer.nama"),
      CustomerAlamatValidator(false, "customer.alamat"),
      CustomerTeleponValidator(false, "customer.telepon"),
      OrderItemsValidator(),
      OrderItemsQtyValidator(),
      OrderItemsSubtotalValidator(),
      BarangNomorValidator(true, "items.*.nomor"),
      BarangIDValidator(false, false, true, "items.*._id"),
      BarangNamaValidator(false, "items.*.nama"),
      BarangSatuanValidator(false, "items.*.satuan"),
      BarangHargaJualValidator(false, "items.*.hargaJual"),
      BarangStokValidator(false, "items.*.stok"),
    ]),
  ],
  OrderCreate
);
OrderRouter.get("/:id", [IsAuthenticated], OrderDetail);

module.exports = {
  OrderRouter,
};
