import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaChartLine, FaBullhorn, FaPaintBrush } from 'react-icons/fa';

const ServiceCard = ({ Icon, title, description, index, expandedIndex, handleExpand }) => (
  <motion.div
    className="flex-shrink-0 w-full sm:w-80 md:w-96 snap-start px-4 sm:px-2 mb-6"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative bg-black p-8 flex justify-center items-center">
        <Icon className="text-white text-6xl" />
      </div>
      <div className="p-6">
        <h2 className="text-black text-xl font-semibold">{title}</h2>
        <div className="w-10 mt-3 h-0.5 bg-emerald-400"></div>
        <motion.button
          className="mt-4 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-700 to-fuchsia-700 text-white"
          onClick={() => handleExpand(index)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {expandedIndex === index ? '-' : '+'}
        </motion.button>
        <AnimatePresence>
          {expandedIndex === index && (
            <motion.div
              className="text-black text-sm sm:text-base tracking-normal py-4 leading-relaxed break-words overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', maxHeight: 200 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
);

const InteractiveSlide = () => {
  const scrollRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const services = [
    {
      Icon: FaCode,
      title: "Web Design and Development",
      description: "Agencia specializes in crafting visually stunning and functionally robust websites. Our web design and development services ensure that your online presence not only captures attention but also provides a seamless and engaging user experience. From responsive design to custom development, we bring your digital vision to life."
    },
    {
      Icon: FaChartLine,
      title: "Consultation and Strategy",
      description: "Success in the digital realm begins with a solid strategy. Agentic provides consultation services to help you navigate the complexities of the online landscape. Whether you're starting a new project, rebranding, or seeking to optimize your existing digital presence, our experts offer strategic insights and guidance to align your goals with effective solutions."
    },
    {
      Icon: FaBullhorn,
      title: "Digital Marketing",
      description: "Agencia goes beyond design and development to boost your online presence through digital marketing strategies. From SEO and social media marketing to content creation and online advertising, we tailor digital marketing solutions to enhance your visibility, drive traffic, and convert visitors into loyal customers."
    },
    {
      Icon: FaPaintBrush,
      title: "UI/UX Design",
      description: "Our UI/UX design services focus on creating intuitive, user-friendly interfaces that enhance user engagement and satisfaction. We combine aesthetics with functionality to deliver designs that not only look great but also provide an optimal user experience across all devices and platforms."
    }
  ];

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    }
  }, [inView]);

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      const currentScroll = scrollRef.current.scrollLeft;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (direction === 'right' && currentScroll >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
      } else if (direction === 'left' && currentScroll <= 10) {
        scrollRef.current.scrollTo({ left: maxScroll, behavior: 'auto' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scroll('right');
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div ref={ref} className='px-10 py-10 relative w-screen min-h-screen bg-gray-800'>
      <div className='text-6xl text-white font-semibold tracking-wide mb-12'>
        <h1>Our</h1> 
        <h1 className='text-emerald-500'>Services</h1>
      </div>
      {shouldAnimate && (
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-10 snap-x snap-mandatory no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                {...service} 
                index={index}
                expandedIndex={expandedIndex}
                handleExpand={handleExpand}
              />
            ))}
          </div>
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveSlide;