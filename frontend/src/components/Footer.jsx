import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer">
      <p className="footerParagraph">Copyright &copy; {year}. Gamel Ayodele</p>
    </div>
  );
};

export default Footer;
