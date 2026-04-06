import { Link } from "react-router-dom";
import logoImage from "../assets/logo1.png";

export default function Logo({ disableLink = false, className = "" }) {
  const imageElement = (
    <img
      src={logoImage}
      alt="ASHA VANI Logo"
      className={`h-16 md:h-20 w-auto object-contain flex-shrink-0 ${className}`}
    />
  );

  if (disableLink) {
    return <div className="inline-block relative z-50">{imageElement}</div>;
  }

  return (
    <Link to="/" className="inline-block relative z-50 hover:opacity-80 transition-opacity">
      {imageElement}
    </Link>
  );
}
