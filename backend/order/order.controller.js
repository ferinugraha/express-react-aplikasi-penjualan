const { Pagination } = require("../libs/lib.common");
const { ExceptionHandler, Error404 } = require("../libs/lib.exception");
const { OrderModel } = require("./order.model");
const { KasModel } = require("../kas/kas.model");
const { OrderSearch, OrderFilter } = require("./order.search");
const { CheckItems } = require("./order.service");

async function OrderList(req, res) {
  try {
    const result = OrderModel.find();
    const search = OrderSearch(req, result);
    const filter = OrderFilter(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function OrderCreate(req, res) {
  try {
    await CheckItems(req.body);
    const result = await OrderModel.create(req.body);

    const kas = {
      nomor: result.nomor,
      jumlah_keluar: result.total,
      jumlah_masuk: 0,
      tanggal: result.tanggal,
    };

    await KasModel.create(kas);

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function OrderDetail(req, res) {
  try {
    const result = await OrderModel.findOne({ _id: req.params.id });

    if (!result) {
      throw new Error404("Order tidak tersedia");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

// detail
// list

module.exports = {
  OrderList,
  OrderCreate,
  OrderDetail,
};
