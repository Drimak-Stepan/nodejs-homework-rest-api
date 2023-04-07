const express = require("express");

const {
  getAllContacts,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contactsController");

const { validateBody } = require("../../middlewars");
const { schemas } = require("../../models/contact");

const router = express.Router();

router
  .get("/", getAllContacts)
  .get("/:contactId", getById)
  .post("/", validateBody(schemas.addContactSchema), add)
  .delete("/:contactId", remove)
  .put("/:contactId", validateBody(schemas.updateContactSchema), update)
  .patch(
    "/:contactId/favorite",
    validateBody(schemas.updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
