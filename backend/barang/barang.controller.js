const {
  Pagination,
  SearchBackend,
  FilterBackend,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { BarangModel } = require("./barang.model");

async function BarangList(req, res) {
  try {
    const result = BarangModel.find();
    const search = SearchBackend(req, result, ["nomor", "nama", "satuan"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function BarangCreate(req, res) {
  try {
    const result = await BarangModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function BarangDetail(req, res) {
  try {
    const result = await GetOr404(BarangModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function BarangDetailByNomor(req, res) {
  try {
    const result = await GetOr404(BarangModel, { nomor: req.params.nomor });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function BarangUpdate(req, res) {
  try {
    await GetOr404(BarangModel, { _id: req.params.id });
    const result = await BarangModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function BarangDelete(req, res) {
  try {
    await GetOr404(BarangModel, { _id: req.params.id });
    await BarangModel.findOneAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  BarangList,
  BarangCreate,
  BarangDetail,
  BarangUpdate,
  BarangDelete,
  BarangDetailByNomor,
};
