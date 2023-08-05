import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, reset } from "../features/contact/contactSlice";
import ContactItem from "./ContactItem";
import Spinner from "./Spinner";

const Contact = () => {
  const { contacts, isLoading, isSuccess } = useSelector(
    (state) => state.contact
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="py-5">
      <div>
        {contacts?.map((contact) => (
          <ContactItem key={contact._id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Contact;
