const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  switch (err.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).send({ error: err.message });
  }

  next(err);
};

module.exports = errorHandler;
