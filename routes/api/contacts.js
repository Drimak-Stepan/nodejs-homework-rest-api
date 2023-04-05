const express = require("express");

const {
  getAllContacts,
  getById,
  add,
  remove,
  update,
} = require("../../controllers/contactsController");

const {
  addContactValidator,
  updateContactValidator,
} = require("../../middlewars");

const router = express.Router();

router
  .get("/", getAllContacts)
  .get("/:contactId", getById)
  .post("/", addContactValidator, add)
  .delete("/:contactId", remove)
  .put("/:contactId", updateContactValidator, update);

module.exports = router;
