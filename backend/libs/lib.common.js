const { Error404 } = require("./lib.exception");
const { Logging } = require("./lib.logging");

function Previous(page) {
  if (page - 1 <= 0) {
    return null;
  }

  return page - 1;
}

function Next(totalPages, page) {
  if (page + 1 > totalPages) {
    return null;
  }

  return page + 1;
}

async function Pagination(req, res, model) {
  const modelSetClone = model.clone();
  const modelSetPagin = model.clone();
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page) || page;
  }

  const pageLimit = req.query.limit ? parseInt(req.query.limit) : 10;
  const firstPage = page > 1 ? page * pageLimit - pageLimit : 0;

  const count = await modelSetClone.countDocuments();
  const totalPages = Math.ceil(count / pageLimit);
  const results = await modelSetPagin.limit(pageLimit).skip(firstPage);

  const previous = Previous(page);
  const next = Next(totalPages, page);

  return {
    next,
    previous,
    totalPages,
    count, 
    results: await results
  }

}


const SearchBackend = (req, model, fields) => {
  const { search } = req.query;

  if (search) {
    const filterSet = [];
    for (let field of fields) {
      filterSet.push({[field]: { $regex: ".*" + search + ".*", $options: 'i' }})
    }

    return model.find({$or: filterSet})
  }

  return model;
}

const FilterBackend = (req, model) => {
  const { field, value } = req.query;

  if (field && value) {
    return model.find({ [field]: value })
  }

  return model;
}

const GetOr404 = async (model, options) => {
  const result = await model.findOne(options);

  if (!result) {
    Logging.error("Data not found")
    throw new Error404("Data not found")
  }

  return result;
}

module.exports = {
  Pagination,
  SearchBackend,
  FilterBackend,
  GetOr404
}