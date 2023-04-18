const ctrlWrapper = require("./ctrlWrapper");
const validateBody = require("./validator");
const validateId = require("./validatorId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  ctrlWrapper,
  validateBody,
  validateId,
  authenticate,
  upload,
};
