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
              Soft Whispers of Care, Just for You🌸
            </motion.h1>
            <motion.div 
              className="h-1 bg-pink-500 w-3/4"
              variants={linesVariants}
            />
            <motion.p 
              className="text-sm sm:text-lg text-black-600"
              variants={linesVariants}
            >
              𝒴𝑜𝓊𝓇 𝒷𝑜𝒹𝓎 𝓉𝑒𝓁𝓁𝓈 𝒶 𝓈𝓉𝑜𝓇𝓎—𝑜𝓃𝑒 𝓉𝒽𝒶𝓉 𝒹𝑒𝓈𝑒𝓇𝓋𝑒𝓈 𝓉𝑜 𝒷𝑒 𝒽𝑒𝒶𝓇𝒹, 𝓊𝓃𝒹𝑒𝓇𝓈𝓉𝑜𝑜𝒹, 𝒶𝓃𝒹 𝒸𝒶𝓇𝑒𝒹 𝒻𝑜𝓇. 𝐹𝓇𝑜𝓂 𝓅𝓊𝒷𝑒𝓇𝓉𝓎 𝓉𝑜 𝓂𝑒𝓃𝑜𝓅𝒶𝓊𝓈𝑒, 𝓌𝑒 𝓅𝓇𝑜𝓋𝒾𝒹𝑒 𝓀𝓃𝑜𝓌𝓁𝑒𝒹𝑔𝑒, 𝓈𝓊𝓅𝓅𝑜𝓇𝓉, 𝒶𝓃𝒹 𝑔𝓊𝒾𝒹𝒶𝓃𝒸𝑒 𝒻𝑜𝓇 𝑒𝓋𝑒𝓇𝓎 𝓈𝓉𝒶𝑔𝑒 𝑜𝒻 𝓌𝑜𝓂𝒶𝓃𝒽𝑜𝑜𝒹. 𝐵𝓇𝑒𝒶𝓀 𝓉𝒽𝑒 𝓈𝒾𝓁𝑒𝓃𝒸𝑒, 𝑒𝓂𝒷𝓇𝒶𝒸𝑒 𝒶𝓌𝒶𝓇𝑒𝓃𝑒𝓈𝓈, 𝒶𝓃𝒹 𝓉𝒶𝓀𝑒 𝒸𝒽𝒶𝓇𝑔𝑒 𝑜𝒻 𝓎𝑜𝓊𝓇 𝓌𝑒𝓁𝓁-𝒷𝑒𝒾𝓃𝑔. 𝐵𝑒𝒸𝒶𝓊𝓈𝑒 𝓎𝑜𝓊𝓇 𝒽𝑒𝒶𝓁𝓉𝒽 𝒾𝓈𝓃’𝓉 𝒿𝓊𝓈𝓉 𝒾𝓂𝓅𝑜𝓇𝓉𝒶𝓃𝓉—𝒾𝓉’𝓈 𝑒𝓋𝑒𝓇𝓎𝓉𝒽𝒾𝓃𝑔.  
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