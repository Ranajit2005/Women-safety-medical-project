import React from "react";
import Card from "../components/CardD";
import Navbar from "../components/Navbar";

const diseases = () => {
  const cardData = [
    {
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      title: "Web Development",
      content: "Build modern web applications",
      hoverContent:
        "We specialize in React, Next.js, and Tailwind CSS for creating responsive, high-performance websites.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      title: "UI/UX Design",
      content: "Beautiful, intuitive interfaces",
      hoverContent:
        "Our design team creates user-centered interfaces with Figma and Adobe XD, focusing on accessibility.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      title: "Data Analytics",
      content: "Turn data into insights",
      hoverContent:
        "Advanced analytics solutions using Python, SQL, and Tableau to drive data-informed decisions.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
      title: "Mobile Apps",
      content: "iOS and Android development",
      hoverContent:
        "Cross-platform mobile development with React Native and Flutter for seamless user experiences.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      title: "Cloud Solutions",
      content: "Scalable infrastructure",
      hoverContent:
        "AWS, Azure, and Google Cloud implementations with CI/CD pipelines and DevOps best practices.",
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/bg/bg3.jpg')` }}
      ></div>

      
      <Navbar/>
      
      <div className="container mx-auto px-4 py-12 mt-8">
        <h2 className="text-3xl font-bold text-center mb-8 ">Women Product</h2>
        <div className="flex flex-col gap-8">
          {cardData.map((card, index) => (
            <Card
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              content={card.content}
              hoverContent={card.hoverContent}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default diseases;
