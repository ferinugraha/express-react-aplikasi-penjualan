const {
  SearchBackend,
  FilterBackend,
  Pagination,
  GetOr404,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { CustomerModel } = require("./customer.model");

async function CustomerList(req, res) {
  try {
    const result = CustomerModel.find();
    const search = SearchBackend(req, result, ["nomor", "nama", "telepon"]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function CustomerCreate(req, res) {
  try {
    const result = await CustomerModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function CustomerDetail(req, res) {
  try {
    const result = await GetOr404(CustomerModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function CustomerDetailByNomor(req, res) {
  try {
    const result = await GetOr404(CustomerModel, { nomor: req.params.nomor });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function CustomerUpdate(req, res) {
  try {
    await GetOr404(CustomerModel, { _id: req.params.id });
    const result = await CustomerModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function CustomerDelete(req, res) {
  try {
    await GetOr404(CustomerModel, { _id: req.params.id });
    await CustomerModel.findOneAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  CustomerList,
  CustomerCreate,
  CustomerDetail,
  CustomerUpdate,
  CustomerDelete,
  CustomerDetailByNomor,
};
