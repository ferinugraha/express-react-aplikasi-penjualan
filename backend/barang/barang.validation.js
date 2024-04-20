const { body } = require("express-validator");
const { BarangModel } = require("./barang.model");

const BarangIDValidator = (target = "nomor") => {
  const validator = body(target);

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.isMongoId().withMessage("Format ID tidak valid.").bail();
  validator.notEmpty().withMessage("Field tidak boleh kosong.").bail();

  validator
    .custom(async (id) => {
      const barang = await BarangModel.findOne({ _id: id });
      if (!barang) {
        throw new Error("Id barang tidak tersedia");
      }
    })
    .bail();

  return validator;
};

const BarangNomorValidator = (
  optional = false,
  forCreate = true,
  forModule = false,
  target = "nomor"
) => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.notEmpty().withMessage("Field tidak boleh kosong.").bail();
  validator
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .bail();

  if (forCreate) {
    validator
      .custom(async (nomor) => {
        const barang = await BarangModel.findOne({ nomor });
        if (barang) {
          throw new Error("Nomor sudah digunakan.");
        }
      })
      .bail();
  }

  if (forModule) {
    validator
      .custom(async (nomor) => {
        const barang = await BarangModel.findOne({ nomor });
        if (!barang) {
          throw new Error("Nomor tidak tersedia.");
        }
      })
      .bail();
  }

  return validator;
};

const BarangNamaValidator = (optional = false, target = "nama") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.notEmpty().withMessage("Nama tidak boleh kosong.").bail();
  validator
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100 karakter")
    .bail();

  return validator;
};

const BarangSatuanValidator = (optional = false, target = "nama") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.notEmpty().withMessage("Nama tidak boleh kosong.").bail();
  validator
    .isLength({ min: 1, max: 10 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 10 karakter")
    .bail();

  return validator;
};

const BarangHargaJualValidator = (optional = false, target = "hargaJual") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.notEmpty().withMessage("Field tidak boleh kosong.").bail();
  validator
    .isInt({ min: 1000 })
    .withMessage("Format harus bilangan bulat minimum 1000.")
    .bail();

  return validator;
};

const BarangStokValidator = (optional = false, target = "stok") => {
  const validator = body(target);

  if (optional) {
    validator.optional();
  }

  validator.exists().withMessage("Field harus tersedia!").bail();
  validator.notEmpty().withMessage("Field tidak boleh kosong.").bail();
  validator
    .isInt({ min: 1 })
    .withMessage("Format harus bilangan bulat minimum 1.")
    .bail();
  return validator;
};

module.exports = {
  BarangIDValidator,
  BarangNomorValidator,
  BarangNamaValidator,
  BarangSatuanValidator,
  BarangStokValidator,
  BarangHargaJualValidator,
};
