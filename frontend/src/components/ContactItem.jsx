import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../features/contact/contactSlice";
const ContactItem = ({ contact }) => {
  const [showText, setShowText] = useState(false);
  const dispatch = useDispatch();
  const closeContact = (contactId) => {
    dispatch(deleteContact(contactId));
    window.location.reload(true);
  };

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <div className="card card-body mb-4">
        <div className="column">
          <h3>
            {contact.name}
            <button onClick={() => setShowText(!showText)} className="button">
              <MdOutlineKeyboardDoubleArrowDown className="arrow" />
            </button>
          </h3>
          <div>
            <Link to={`/update/${contact._id}`}>
              <button className="button">
                <FaEdit className="edit" />
              </button>
            </Link>
            <button
              onClick={() => closeContact(contact._id)}
              className="button"
            >
              <FaTrash className="trash" />
            </button>
          </div>
        </div>
        {showText && (
          <ul className="list-group">
            <li className="list-group-item">Email: {contact.email}</li>
            <li className="list-group-item">Phone: {contact.phone}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
