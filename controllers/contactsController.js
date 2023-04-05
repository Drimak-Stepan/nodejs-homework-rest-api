const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { ctrlWrapper } = require("../middlewars");

const getAllContacts = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async ({ params }, res) => {
  const { contactId } = params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
