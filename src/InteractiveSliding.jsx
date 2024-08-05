import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const InteractiveSliding = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const items = [
    { title: "What We Do", description: `At Mediaflare, our mission is to illuminate your brand’s potential and bring it to life. Whether you’re launching a new venture or evolving an established presence, our expertise lies in building a strong brand foundation and strategy that forms the core of your success. Collaborating closely with your internal team, our comprehensive approach to brand development sets the stage for everything that follows—defining your brand’s personality, positioning, values, and design experience. Together, we elevate brands to new heights.` },
    { title: "Creative", description: `At Mediaflare, our creative services are designed to transform your vision into captivating visual narratives. Our Creative Services Include:

    Graphic Design, 
    Videography, 
    Photography, 
    Motion Graphics, 
    Copywriting, 
    Content Creation, 
    Visual Storytelling, 
    Advertising Campaigns, 
    Brand Collateral Design.` },
    { title: "Marketing", description: `At Mediaflare, our marketing services are tailored to amplify your brand's voice and reach. We blend innovative strategies with data-driven insights to create impactful campaigns that connect with your target audience. Our dedicated team ensures your brand's message is heard loud and clear in the digital space.

    Our Marketing Services Include:
    
    Social Media Management,
    Digital Advertising,
    Search Engine Optimization (SEO),
    Content Marketing,
    Email Marketing,
    Influencer Partnerships,
    Market Research & Analysis,
    Campaign Strategy & Execution,
    Performance Analytics & Reporting.` },
    { title: "Technical", description: `At Mediaflare, our technical services are designed to build a robust digital foundation for your brand. We combine cutting-edge technology with innovative solutions to ensure seamless performance and a superior user experience. Our skilled team works meticulously to deliver reliable and scalable digital solutions.

    Our Technical Services Include:
    
    Website Development,
    Mobile App Development,
    E-commerce Solutions,
    Web Hosting & Maintenance,
    User Experience (UX) Design,
    Content Management Systems (CMS),
    Custom Software Development,
    API Integration,
    Data Security & Compliance.` },
  ];

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-screen min-h-screen bg-orange-100 flex items-center justify-center font-termina p-4">
      <div className="w-full max-w-7xl">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="mb-6"
            initial={false}
            animate={{ height: expandedIndex === index ? 'auto' : '60px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="relative flex items-center justify-between bg-white rounded-lg shadow-md p-4">
              <h1 className="text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tighter">
                {item.title}
              </h1>
              <motion.button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white"
                onClick={() => handleExpand(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {expandedIndex === index ? <FaMinus /> : <FaPlus />}
              </motion.button>
            </div>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="bg-white text-black p-4 rounded-b-lg shadow-md mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSliding;