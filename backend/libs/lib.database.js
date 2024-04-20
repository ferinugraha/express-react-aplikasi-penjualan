const mongoose = require("mongoose");
const { LOG_INFO, Logging, LOG_ERROR } = require("./lib.logging");

const { MONGO_URI } = process.env;

// const configDB = {
//   useNewUrlParser: true,
// };

const MongoDBConnection = () => {
  mongoose
    .connect(MONGO_URI /*configDB*/)
    .then(() => {
      Logging.log(LOG_INFO, "Berhasil terhubung ke database mongoDB");
    })
    .catch((error) => {
      Logging.log(LOG_ERROR, "Gagal terkoneksi database mongoDB");
      Logging.log(LOG_ERROR, error.message);
    });
};

module.exports = {
  MongoDBConnection,
};
