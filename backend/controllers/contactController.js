const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Contact = require("../models/contactModel");

// @desc Get user contacts
// @route GET/api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json(contacts);
});

// @desc Get user contact
// @route GET/api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  res.status(200).json(contact);
});

// @desc create new contacts
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add a name, email and phone number");
  }
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc Delete user contacts
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await contact.deleteOne();
  res.status(200).json({ success: true });
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
