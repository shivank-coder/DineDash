import React from 'react';

function Footer() {
  return (
    <footer className="bg-pink-300
 text-white pt-8 pb-4 w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold mb-4">DineDash</h2>
            <p className="mb-4">Your favorite meals delivered right to your doorstep. Quality, freshness, and convenience—always.</p>

            {/* Social Media Links */}
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4 mt-2">
              <a href="https://facebook.com" className="text-white hover:text-blue-800">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-pink-600">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="https://twitter.com" className="text-white hover:text-blue-400">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">📍 123 Food Street, City, Country</p>
            <p className="mb-2">📞 (123) 456-7890</p>
            <p className="mb-4">✉️ support@dinedash.com</p>
          </div>

          {/* App Store & Play Store Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Download Our App</h3>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
              <a href="https://www.apple.com/app-store/" className="hover:text-white">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1b/App_Store_logo.svg"
                  alt="App Store"
                  className="h-12"
                />
              </a>
              <a href="https://play.google.com/store" className="hover:text-white">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/58/Google_Play_Store_logo_2015.svg"
                  alt="Play Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="#home" className="text-white hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-300">About Us</a>
              </li>
              <li>
                <a href="#menu" className="text-white hover:text-gray-300">Menu</a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-gray-200">
          <p>&copy; 2024 DineDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
