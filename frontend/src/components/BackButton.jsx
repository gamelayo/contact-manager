import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const BackButton = ({ url }) => {
  return (
    <div className="back">
      <Link to={url} className="btN btn-reverse btn-back ">
        <FaArrowAltCircleLeft />
        Back
      </Link>
    </div>
  );
};
