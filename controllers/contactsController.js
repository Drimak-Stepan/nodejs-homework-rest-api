const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../middlewars");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...favotite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner, ...favotite }, undefined, {
    skip,
    limit,
  }).populate("owner", "subscription email");
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  const contact = await Contact.findOne({ _id: contactId, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

const update = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;

  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const {
    user: { _id: owner },
    params: { contactId },
  } = req;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
