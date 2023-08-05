import axios from "axios";

const API_URL = "/api/contacts/";

// Create new contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, contactData, config);

  return response.data;
};
// Get Contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
// Get user Contact
const getContact = async (token, contactId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + contactId, config);

  return response.data;
};
// update contact
const updateContact = async (contactId, contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + contactId, contactData, config);

  return response.data;
};

// Delete Contact
const deleteContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + contactId, config);

  return response.data;
};

const contactService = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};

export default contactService;
