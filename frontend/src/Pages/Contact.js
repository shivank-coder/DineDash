import React from 'react';
import { Transition } from 'react-transition-group';

function Contact() {
  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <Transition in={true} timeout={duration} appear>
          {(state) => (
            <h1
              className={`text-4xl md:text-5xl font-bold text-center text-blue-800 mb-6 ${state === 'entered' ? 'animate-fade-in' : ''}`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              Contact Us
            </h1>
          )}
        </Transition>

        <p className="text-center text-gray-600 mb-8">
          We would love to hear from you! Whether you have a question or need assistance, feel free to reach out to us.
        </p>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <i className="fas fa-envelope text-2xl text-blue-600"></i>
            <p className="text-gray-700 font-semibold">Email: <span className="text-blue-600">contact@dinedash.com</span></p>
          </div>

          <div className="flex items-center space-x-4">
            <i className="fas fa-map-marker-alt text-2xl text-blue-600"></i>
            <p className="text-gray-700 font-semibold">Address: <span className="text-blue-600">123 Food Street, City, State, ZIP Code</span></p>
          </div>

          <div className="flex items-center space-x-4">
            <i className="fas fa-phone-alt text-2xl text-blue-600"></i>
            <p className="text-gray-700 font-semibold">Phone: <span className="text-blue-600">+91 6306319571</span></p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:contact@dinedash.com"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Us an Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
