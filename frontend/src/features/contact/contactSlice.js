import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contacts: [],
  contact: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new contact
export const createContact = createAsyncThunk(
  "contact/create",
  async (contactData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.createContact(contactData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get Contacts
export const getContacts = createAsyncThunk(
  "contact/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.getContacts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Contact
export const getContact = createAsyncThunk(
  "contact/get",
  async (contactId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.getContact(token, contactId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update contact
export const updateContact = createAsyncThunk(
  "contact/update",
  async ({ contactId, contactData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.updateContact(contactId, contactData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user post
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (contactId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.deleteContact(contactId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
