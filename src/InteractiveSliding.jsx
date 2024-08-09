import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaChartLine, FaBullhorn, FaPaintBrush, FaSearchDollar, FaMobileAlt } from 'react-icons/fa';

const ServiceCard = ({ Icon, title, description }) => {
  return (
    <motion.div 
      className="w-full sm:w-1/2 md:w-1/3 p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-64 relative group">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-transform duration-300 transform group-hover:-translate-y-full">
          <Icon className="text-5xl text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="absolute inset-0 bg-emerald-500 p-6 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 flex items-center justify-center">
          <p className="text-white text-center">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const InteractiveSlide = () => {
  const services = [
    {
      Icon: FaCode,
      title: "Web Development",
      description: "We create robust and scalable web applications tailored to your specific needs, ensuring a seamless user experience across all devices."
    },
    {
      Icon: FaChartLine,
      title: "Digital Strategy",
      description: "Our expert team crafts comprehensive digital strategies to boost your online presence and achieve your business goals."
    },
    {
      Icon: FaBullhorn,
      title: "Digital Marketing",
      description: "We leverage cutting-edge marketing techniques to increase your brand visibility and drive conversions in the digital space."
    },
    {
      Icon: FaPaintBrush,
      title: "UI/UX Design",
      description: "Our designers create intuitive and visually appealing interfaces that enhance user engagement and satisfaction."
    },
    {
      Icon: FaSearchDollar,
      title: "SEO Optimization",
      description: "We optimize your online content to improve search engine rankings and increase organic traffic to your website."
    },
    {
      Icon: FaMobileAlt,
      title: "Mobile App Development",
      description: "We develop high-performance, user-friendly mobile applications for both iOS and Android platforms."
    }
  ];

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Services</h2>
        <div className="flex flex-wrap -mx-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSlide;