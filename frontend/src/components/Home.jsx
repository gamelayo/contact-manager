import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";

const Home = () => {
  return (
    <div className=" py-5">
      <div className="container h">
        <h2>Contact Manager</h2>
        <p>This is a portfolio project to showcase knowledge of:</p>
        <ol>
          <li>React Components and Jsx.</li>
          <li>React Router.</li>
          <li>React Redux and ReduxJs/toolkit for state management</li>
          <li>MonogoDB for storing data to the database</li>
          <li>Nodejs and ExpressJs for the backend</li>
          <li>Jsonwebtoken for authentication</li>
          <li>
            Bcryptjs for hashing the password before storing to the database
          </li>
          <li>Render for hosting </li>
        </ol>
        <div className="py-2">
          <Link to="/add" className="btN btn-reverse btn-block">
            <FaQuestionCircle /> Create New Contact
          </Link>
          <Link to="/contact" className="btN btn-block">
            <MdContactEmergency /> View my Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
