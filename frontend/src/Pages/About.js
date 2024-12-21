import React from 'react';
import { Transition } from 'react-transition-group';
import Footer from '../Component/Footer';

function About() {
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
    <>
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://www.example.com/your-image.jpg)' }}>
      <div className="bg-opacity-70 bg-black text-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <Transition in={true} timeout={duration} appear>
          {(state) => (
            <h1
              className={`text-4xl md:text-5xl font-bold text-center mb-6 ${state === 'entered' ? 'animate-fade-in' : ''}`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              About Us
            </h1>
          )}
        </Transition>
        <p className="text-xl mb-4 leading-relaxed">
          Welcome to our food delivery service! At <strong>DineDash</strong>, we are passionate about delivering exceptional culinary experiences right to your doorstep. Our journey began with a simple vision: to provide our customers with the finest quality food, prepared with love and attention to detail.
        </p>
        <p className="text-xl mb-4 leading-relaxed">
          Our dedicated team of chefs and food enthusiasts work tirelessly to curate a diverse menu that caters to all tastes and preferences. From savory delights to indulgent desserts, each dish is crafted using the freshest ingredients sourced from local suppliers and farmers.
        </p>
        <p className="text-xl mb-4 leading-relaxed">
          We take pride in ensuring that every bite you take is an explosion of flavors that leaves you craving for more. With our commitment to exceptional service, we strive to exceed your expectations by providing fast, reliable, and convenient delivery.
        </p>
        <p className="text-xl leading-relaxed">
          Join us on this culinary adventure and let us bring the joy of great food to your doorstep. If you have any questions or inquiries, please feel free to contact us. We are here to help!
        </p>
      </div>
      
    </div>
    <Footer/>
    </>
    
  );
}

export default About;
