import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaChartLine, FaBullhorn, FaPaintBrush, FaSearchDollar, FaMobileAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ServiceCard = ({ Icon, title, description, isMobile }) => {
  return (
    <motion.div 
      className={`w-full ${isMobile ? 'sm:w-80 md:w-80' : 'sm:w-1/2 md:w-1/3'} p-6 flex-shrink-0`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isMobile ? 'h-auto' : 'h-64'} relative group`}>
        {isMobile ? (
          <div className="p-6">
            <Icon className="text-5xl text-emerald-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">{title}</h3>
            <hr />
            <p className="text-gray-600 mt-5 mb-5 text-center">{description}</p>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-transform duration-300 transform group-hover:-translate-y-full">
              <Icon className="text-5xl text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="absolute inset-0 bg-emerald-500 p-6 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 flex items-center justify-center">
              <p className="text-white text-center">{description}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const InteractiveSlide = () => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -scrollContainerRef.current.offsetWidth : scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
    <div className="bg-gray-300 py-8 px-4 sm:px-6 lg:px-7">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Services</h2>
        <div className="relative">
          {isMobile && (
            <>
              <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
                <FaChevronLeft className="text-emerald-500" />
              </button>
              <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
                <FaChevronRight className="text-emerald-500" />
              </button>
            </>
          )}
          <div 
            ref={scrollContainerRef}
            className={`flex ${isMobile ? 'overflow-x-auto scrollbar-hide no-scrollbar mt-32' : 'flex-wrap'} -mx-4`}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSlide;