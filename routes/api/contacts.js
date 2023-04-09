const express = require("express");

const {
  getAllContacts,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contactsController");

const { validateBody, validateId } = require("../../middlewars");
const { schemas } = require("../../models/contact");

const router = express.Router();

router
  .get("/", getAllContacts)
  .get("/:contactId", validateId, getById)
  .post("/", validateBody(schemas.addContactSchema), add)
  .delete("/:contactId", validateId, remove)
  .put(
    "/:contactId",
    validateId,
    validateBody(schemas.updateContactSchema),
    update
  )
  .patch(
    "/:contactId/favorite",
    validateId,
    validateBody(schemas.updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
