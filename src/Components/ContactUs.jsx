import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import logo from '/images/mediaflarelogo.png'; 

const ContactPage = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="min-h-screen text-white tracking-wider flex flex-col justify-between p-8 mt-20 font-anton tracking-wider bg-gray-600">
      <div className="flex justify-between items-start">
        {/* Add content here if needed */}
      </div>

      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={contentVariants}
        className="flex flex-col md:flex-row justify-center gap-10 items-center"
      >
        <div className="space-y-8 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-xl mb-2">(LET'S CONNECT)</h2>
            <a href="#"><img src={logo} alt="Mediaflare Logo" className="h-24 md:h-40" /></a>
          </div>
          <div>
            <a href="tel:+91 6260 074 553" className="text-3xl md:text-4xl font-normal">+91 6260 074 553</a>
          </div>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <h2 className="text-2xl md:text-xl mb-4">(FOLLOW US)</h2>
          <div className='ml-0 sm:ml-0 md:ml-5 lg:ml-16'>
            <a href="https://www.instagram.com/mediaflare.tech?igsh=Z3Q2Z3QxNnlhdWdy&utm_source=qr" className="flex items-center text-pink-500 space-x-2 text-2xl">
              <FaInstagram />
              <span className='text-white'>mediaflare.tech</span>
            </a>
            <a href="mailto:contactus@mediaflare.tech" className="flex text-blue-500 items-center space-x-2 text-2xl">
              <FaEnvelope />
              <span className='text-white'>contactus@mediaflare.tech</span>
            </a>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center items-center">
        <p className="text-sm">© 2024 by Mediaflare</p>
      </div>
    </div>
  );
};

export default ContactPage;