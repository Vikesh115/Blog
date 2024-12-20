// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full bg-lime-600 md:bg-orange-600 p-4">
      <div className="flex flex-col justify-between items-center gap-4">
        <p>&copy; 2024 My Blog. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="md:h-12 md:w-12 h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="md:h-12 md:w-12 h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="md:h-12 md:w-12 h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
