import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const LearnWithUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      <motion.div 
        className="relative text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-x-0 top-1/2 transform -translate-y-1/2"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        </motion.div>
        <div className="relative space-y-4">
          <motion.h1 
            className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Work
          </motion.h1>
          <motion.h2 
            className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            With Us
          </motion.h2>
        </div>
      </motion.div>
      <motion.p 
        className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-2xl text-center px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Embark on a journey of growth and success with our cutting-edge digital marketing, SEO, web development, and design services. Our team of experts is here to elevate your brand and drive your business forward.
      </motion.p>
    </div>
  );
};

export default LearnWithUs;