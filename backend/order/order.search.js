const OrderSearch = (req, model) => {
  const { search } = req.query;

  if (search) {
    return model.find({
      $or: [
        { "nomor": { $regex: ".*" + search + ".*", $options: 'i' } },
        { "customer.nama": { $regex: ".*" + search + ".*", $options: 'i' } },
        { "customer.nomor": { $regex: ".*" + search + ".*", $options: 'i' } },
      ]
    })
  }

  return model;
}

const OrderFilter = (req, model) => {
  const { field, value } = req.query;

  if (field && value)  {
    return model.find({ [field]: value })
  }

  return model;
}

module.exports = {
  OrderSearch,
  OrderFilter
}