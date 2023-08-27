import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateContact } from "../features/contact/contactSlice";
import { getContact } from "../features/contact/contactSlice";
import Spinner from "./Spinner";
const UpdateInfo = () => {
  const { contactId } = useParams();
  const { contact, isError, isLoading, message } = useSelector(
    (state) => state.contact
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getContact(contactId));
  }, [contactId, dispatch]);
  const [name, setName] = useState("" || contact?.name);
  const [email, setEmail] = useState("" || contact?.email);
  const [phone, setPhone] = useState("" || contact?.phone);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const contactData = { name, email, phone };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact({ contactId, contactData }));
    navigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="py-5">
      <form className="container" onSubmit={onSubmit}>
        <div className="card text-dark bg-light">
          <div className="card-header">Update Contact</div>
          <div className="card-body">
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder={contact?.name}
                className="form-control form-control-lg"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder={contact?.email}
                className="form-control form-control-lg"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                placeholder={contact?.phone}
                className="form-control form-control-lg"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="submit"
                value="Update Contact"
                className="form-control"
                style={{ color: "white", backgroundColor: "rgb(31, 30, 30)" }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfo;
