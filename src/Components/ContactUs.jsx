import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import logo from '/images/mediaflarelogo.png';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 500;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-50" />;
};

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
    <div className="min-h-screen text-white tracking-wider flex flex-col justify-between p-8 mt-20 font-anton tracking-wider bg-gray-600 relative overflow-hidden">
      <AnimatedBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 z-20" />

      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 opacity-20 blur-3xl z-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="flex justify-between items-start relative z-40">
        {/* Add content here if needed */}
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={contentVariants}
        className="flex flex-col md:flex-row justify-center gap-10 items-center relative z-40"
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

      <div className="flex justify-center items-center relative z-40">
        <p className="text-sm">© 2024 by Mediaflare</p>
      </div>
    </div>
  );
};

export default ContactPage;