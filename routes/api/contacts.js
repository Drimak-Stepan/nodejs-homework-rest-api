const express = require("express");

const {
  getAllContacts,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contactsController");

const { authenticate, validateBody, validateId } = require("../../middlewars");
const { schemas } = require("../../models/contact");

const router = express.Router();

router
  .get("/", authenticate, getAllContacts)
  .get("/:contactId", authenticate, validateId, getById)
  .post("/", authenticate, validateBody(schemas.addContactSchema), add)
  .delete("/:contactId", authenticate, validateId, remove)
  .put(
    "/:contactId",
    authenticate,
    validateId,
    validateBody(schemas.updateContactSchema),
    update
  )
  .patch(
    "/:contactId/favorite",
    authenticate,
    validateId,
    validateBody(schemas.updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
