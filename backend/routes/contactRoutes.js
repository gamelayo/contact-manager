const express = require("express");
const router = express.Router();

const {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getContacts).post(protect, createContact);

router
  .route("/:id")
  .get(protect, getContact)
  .delete(protect, deleteContact)
  .put(protect, updateContact);

module.exports = router;
