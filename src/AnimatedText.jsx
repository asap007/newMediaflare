import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import './App.css';
import LearnWithUs from './LearnWithUs';
import ContactUs from './ContactUs';
import InteractiveSliding from './InteractiveSliding';



const textVariant = {
  hidden: { y: "1000%" },
  visible: { y: 0 },
};

const AnimatedText = ({ word1, word2, ribbonText, backgroundColor = 'bg-gray-100' }) => {
  const [isMainTextVisible, setIsMainTextVisible] = useState(false);
  const word1Duration = word1.length * 0.1;

  const { scrollYProgress } = useScroll();
  const overlayHeight = useTransform(scrollYProgress, [0.09, 0.15], ["0%", "100%"]);
  const word1X = useTransform(scrollYProgress, [0.06, 0.17], ["0%", "-150%"]);
  const word2X = useTransform(scrollYProgress, [0.06, 0.17], ["0%", "150%"]);

  const lineOpacity = useTransform(scrollYProgress, [0.04, 0.06, 0.07, 0.45, 0.49], [0, 0.5, 1, 1, 0]);
  const ribbonOpacity = useTransform(scrollYProgress, [0.0, 0.03, 0.05], [1, 0.5 ,0]);

  const rectangleX = useTransform(scrollYProgress, [0.14, 0.45], ["450%", "-720%"]);

  const borderRadius = useTransform(scrollYProgress, [0.19, 0.193], ["2rem", "0rem"]);

  const blackDivWidth = useTransform(scrollYProgress, 
    [0.15, 0.18, 0.2, 0.21, 0.48, 0.52], 
    ["80%", "100%", "100%", "100%", "100%", "0%"]
  );
  const blackDivLeft = useTransform(scrollYProgress, 
    [0.15, 0.17, 0.20, 0.40,0.45], 
    ["20%", "20%", "0%", "0%" ,"-100%"]
  );

  const interactiveSlidingY = useTransform(scrollYProgress,
    [0.45, 0.6],
    ['100%', '0%']
  );
  const learnWithUsY = useTransform(scrollYProgress,
    [0.65, 0.73],
    ['100%', '0%']
  );
  const ContactUsY = useTransform(scrollYProgress,
    [0.80, 1],
    ['100%', '-4.5%']
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMainTextVisible(true);
    }, word1Duration * 1000 + word2.length * 100);

    return () => clearTimeout(timeoutId);
  }, [word1, word2, word1Duration]);

  const getAlternatingZIndex = (index) => index % 2 === 0 ? 2 : 0;

  const renderAnimatedWord = (word, startDelay, xTransform) => (
    <motion.div 
        className="text-[25vw] leading-none flex font-anton relative md:text-[20vw] sm:text-[15vw]"
        style={{ x: xTransform }}
      >
      {word.split("").map((letter, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={textVariant}
          transition={{ duration: 0.6, ease: "easeOut", delay: startDelay + index * 0.1 }}
          className="inline-block"
          style={{ zIndex: getAlternatingZIndex(index + word.length) }}
        >
          {letter}
        </motion.div>
      ))}
    </motion.div>
  );

  const renderRectangles = () => {
  // Updated media items array with descriptions
  const mediaItems = [
    { url: './gifs/1 Aarohan cinematic.gif', title: "AAROHAN", description: `Driven by a striking visual identity, we delved into the core of what makes Aarohan resonate with its audience. We revitalized this brand for the modern digital era, enhancing its online presence through comprehensive website development, dynamic social media strategies, and cohesive design and branding.` },
    { url: './gifs/2 arohan website.gif',title: "WEB DEVELOPMENT", description: `We successfully transformed AAROHAN's digital footprint with our top-notch web development services. Our innovative designs and seamless functionality significantly enhanced their online presence.` },
    { url: './gifs/3 Aarohan Social media.gif',title: "SOCIAL MEDIA", description: `We successfully elevated AAROHAN's online presence through our expert social media marketing. Our engaging content and strategic approach drove significant results across all platforms.` },
    { url: './gifs/4 Reva.gif',title: "REVA", description: `Guided by immersive storytelling and a visually stunning approach, we captured the spirit of Reva's appeal.`},
    { url: '/gifs/4 touchwood.gif',title: "TOUCHWOOD", description: 'Embracing enchanting storytelling and an evocative visual style, we unveiled the true charm of Touchwood Resort. We reimagined this serene getaway for the modern digital era, enhancing its allure through strategic social media engagement and captivating videography.' },
    { url: '/images/Social Snapshot (2).png',title: "SOCIAL SNAPSHOT" ,description: 'Driven by powerful storytelling and a striking visual identity, we uncovered the essence of Social Snapshot. We revitalized this brand for the digital era, enhancing its presence through comprehensive branding strategies. Celebrated for our excellence in brand innovation and digital transformation.' }
  ];

  return (
    <div className="flex overflow-x-auto space-x-20 py-4 w-screen no-scrollbar font-termina">
      {mediaItems.map((item, i) => (
        <motion.div
          key={i}
          className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[28vw] h-auto flex flex-col items-center"
          style={{ x: rectangleX }}
        >
          {item.url.endsWith('.mp4') ? (
            <video src={item.url} autoPlay loop muted className="w-full h-full object-contain shadow-lg" />
          ) : (
            <img src={item.url} alt={`Media ${i}`} className="w-full h-full object-contain shadow-lg" />
          )}
          <motion.div 
            className="bg-black bg-opacity-70 text-white p-2 rounded-b-lg w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <h1 className="text-lg font-anton tracking-wider font-light">{item.title}</h1>
            <p className="text-sm">{item.description}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};


  return (
    <div className="h-[1000vh]"> 
      <div className={`h-screen w-screen flex flex-col items-center justify-center ${backgroundColor} overflow-hidden sticky top-0`}>
      <div className="max-w-28 absolute left-0 top-0 h-9 sm:h-12 md:h-16 lg:h-20" style={{zIndex: 20}}>
        <img src="/images/mediaflarelogo.png" alt="Mediaflare Logo" className="h-full"/>
      </div>

        <div style={{zIndex: 3}}>
          {renderAnimatedWord(word1, 0, word1X)}
          {renderAnimatedWord(word2, word1Duration, word2X)}
        </div>
        <div className="absolute w-full overflow-hidden flex items-center justify-center top-2/3 transform -translate-y-1/2 scroll-wrapper font-termina" style={{ zIndex: 1 }}>
          <div className="scroll-container">
            {isMainTextVisible && (
              <motion.div
                className="scroll-text"
                style={{
                  opacity: ribbonOpacity,
                }}
              >
                {ribbonText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      y: [10, 200, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.05,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <motion.div
          className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-red-700"
          style={{ 
            height: '4px', 
            opacity: lineOpacity,
            zIndex: 4,
          }}
        />
        <motion.div
          className="absolute bg-black rounded-tl-lg rounded-r-3xl"
          style={{ 
            height: overlayHeight,
            width: blackDivWidth,
            left: blackDivLeft,
            bottom: 0,
            zIndex: 3,
            borderTopLeftRadius: borderRadius,
          }}
        />
        <motion.div
          className="absolute w-full h-full"
          style={{
            y: interactiveSlidingY,
            zIndex: 6, 
          }}
        >
          <InteractiveSliding />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 overflow-hidden"
          style={{
            zIndex: 5,
            opacity: useTransform(scrollYProgress, [0.15, 0.155], [0, 1])
          }}
        >
          {renderRectangles()}
        </motion.div>
        <motion.div
          className="absolute w-full"
          style={{
            y: learnWithUsY,
            zIndex: 6,
          }}
        >
          <LearnWithUs />
        </motion.div>
        <motion.div
          className="absolute w-full"
          style={{
            y: ContactUsY,
            zIndex: 6,
          }}
        >
          <ContactUs />
        </motion.div>
      </div>
    </div>
  );
};

AnimatedText.propTypes = {
  word1: PropTypes.string.isRequired,
  word2: PropTypes.string.isRequired,
  ribbonText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};


export default AnimatedText;