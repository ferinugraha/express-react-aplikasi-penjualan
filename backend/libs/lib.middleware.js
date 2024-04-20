const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Logging } = require("./lib.logging");

const IsAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    Logging.log("error", "Token is required for authentication");
    return res
      .status(401)
      .send({ detail: "Token is required for authentication" });
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decode;
  } catch (error) {
    Logging.log("error", "Invalid token");
    return res.status(401).send({ detail: "Invalid token" });
  }

  return next();
};

const Validate = (validations) => {
  return async (err, req, res, next) => {
    for (let validation of validations) {
      await validation.run(req);
      // if (result.errors.length) break;
    }

    const errors = validationResult(req);
    const errs = _.chain(errors.errors).groupBy("path").value();

    console.log("test", errors.isEmpty());
    if (errors.isEmpty()) {
      req.cleanedData = matchedData(req);
      return next();
    }
    res.status(400).json(errs);
  };
};

module.exports = {
  IsAuthenticated,
  Validate,
};
