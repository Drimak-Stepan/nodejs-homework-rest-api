const { ObjectId } = require("mongoose").Types;
const { HttpError } = require("../helpers");

const validateId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = ObjectId.isValid(contactId);
  if (!isCorrectId) {
    next(HttpError(404, "Not found"));
  }
  next();
};

module.exports = validateId;
