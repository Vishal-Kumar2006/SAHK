import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaHome,
} from "react-icons/fa";
import { FaPlateWheat } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-upper">
        <div className="footer-block">
          <div className="footer-components">
            <a href="https://www.facebook.com/">
              <FaFacebook />
              <p>Face Book</p>
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram />
              <p>Instagram</p>
            </a>
            <a href="https://www.youtube.com">
              <FaYoutube />
              <p>Youtube</p>
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter />
              <p>Twitter</p>
            </a>
            <a href="vishalkumar438455@mail.com">
              <MdEmail />
              <p>E-Mail</p>
            </a>
          </div>
        </div>

        <div className="footer-block">
          <div className="footer-components">
            <a href="/">
              <FaHome />
              <p>Home</p>
            </a>
          </div>

          <div className="footer-components">
            <a href="/recipes/new">
              <FaPlateWheat />
              <p>New Recipe</p>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2026</p>
      </div>
    </div>
  );
};

export default Footer;
