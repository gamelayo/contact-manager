import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createContact, reset } from "../features/contact/contactSlice";
import Spinner from "./Spinner";
const AddInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/");
    }
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const contactData = { name, email, phone };
    dispatch(createContact(contactData));
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="py-5">
      <form className="container" onSubmit={onSubmit}>
        <div className="card text-dark bg-light">
          <div className="card-header">Add Contact</div>
          <div className="card-body">
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Add Name"
                className="form-control form-control-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Add Task"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                placeholder="Add Phone"
                className="form-control form-control-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="submit"
                value="Add Contact"
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

export default AddInfo;
