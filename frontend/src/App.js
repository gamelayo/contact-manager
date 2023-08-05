import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import AddInfo from "./components/AddInfo";
import Home from "./components/Home";
import UpdateInfo from "./components/UpdateInfo";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/contact" element={<PrivateRoute />}>
            <Route exact path="/contact" element={<Contact />} />
          </Route>
          <Route exact path="/add" element={<PrivateRoute />}>
            <Route exact path="/add" element={<AddInfo />} />
          </Route>
          <Route path="/update/:contactId" element={<PrivateRoute />}>
            <Route path="/update/:contactId" element={<UpdateInfo />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
