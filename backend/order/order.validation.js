const { body } = require("express-validator");
const { OrderModel } = require("./order.model");

const OrderNomorValidator = (target = "nomor") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .bail()
    .custom(async (nomor) => {
      const order = await OrderModel.findOne({ nomor });
      if (order) {
        throw new Error("Nomor sudah digunakan");
      }
    })
    .bail();
};

const OrderCustomerValidator = (target = "customer") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isObject()
    .withMessage("Format tidak valid.")
    .bail();
};

const OrderTanggalValidator = (target = "tanggal") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Format harus YYYY-MM-DD")
    .bail();
};

const OrderDibayarValidator = (target = "dibayar") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt()
    .withMessage("Field harus bilangan bulat.")
    .bail();
};

const OrderTotalValidator = (target = "total") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt()
    .withMessage("Field harus bilangan bulat.")
    .bail();
};

const OrderItemsValidator = (target = "items") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Minimal memiliki 1 item di dalamnya.")
    .bail();
};

const OrderItemsQtyValidator = (target = "items.*.qty") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt({ min: 1 })
    .withMessage(
      "Field harus bilangan bulat dan minimal qty pembelian sebesar 1."
    )
    .bail();
};

const OrderItemsSubtotalValidator = (target = "items.*.subtotal") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Field harus bilangan bulat.")
    .bail();
};

module.exports = {
  OrderNomorValidator,
  OrderCustomerValidator,
  OrderTanggalValidator,
  OrderDibayarValidator,
  OrderTotalValidator,
  OrderItemsValidator,
  OrderItemsQtyValidator,
  OrderItemsSubtotalValidator,
};
