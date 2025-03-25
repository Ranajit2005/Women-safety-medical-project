import {  motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedEntrance = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Trigger animations when component mounts
    controls.start('visible');
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const linesVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left side - Lines/text */}
          <motion.div 
            className="lg:w-1/2 space-y-6 shadow-[4px_4px_10px_rgba(0,0,0,0.3)] rounded p-5"
            variants={linesVariants}
          >
            <motion.div 
              className="h-1 bg-pink-500 w-full"
              variants={linesVariants}
            />
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800"
              variants={linesVariants}
            >
              I am safe
            </motion.h1>
            <motion.div 
              className="h-1 bg-pink-500 w-3/4"
              variants={linesVariants}
            />
            <motion.p 
              className="text-sm sm:text-lg text-gray-600"
              variants={linesVariants}
            >
              This is our website for women safety and good wells
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, mollitia eaque iste fuga fugit recusandae hic neque ut enim animi consectetur, nemo dolore vitae, velit cupiditate illum. 
            </motion.p>
            <motion.div 
              className="h-1 bg-pink-500 w-1/2"
              variants={linesVariants}
            />
            <motion.button
              className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
              variants={linesVariants}
            >
              <a href="/profile" className=" ">Edit Profile</a>
            </motion.button>
          </motion.div>

          {/* Right side - Image */}
          <motion.div 
            className="my-auto lg:w-1/2 shadow-[4px_4px_10px_rgba(0,0,0,0.3)] rounded-xl"
            variants={imageVariants}
          >
            <motion.img
              src="/bg/bg1.jpg"
              alt="Feature illustration"
              className="w-full h-auto rounded-xl shadow-xl"
              variants={imageVariants}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedEntrance;