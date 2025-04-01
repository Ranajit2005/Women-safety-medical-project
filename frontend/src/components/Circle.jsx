import CircleCard from "./CircleCard";

function Circle() {
  return (
    <div className="flex flex-wrap justify-around px-5 sm:px-7 gap-3 sm:gap-5  ">
      <CircleCard
        imageSrc="/bg/bg1.jpg"
        title="Women health"
        hoverText="Know about different diseases affecting the female body."
        link="/diseases"
      />
      <CircleCard
        imageSrc="bg/bg1.jpg"
        title="Substances and women's body"
        hoverText="Understand how substances affect women's health."
        link="#"
      />
      <CircleCard
        imageSrc="/bg/bg1.jpg"
        title="Community and blogs"
        hoverText="Join the conversation and share your experiences."
        link="#"
      />
      <CircleCard
        imageSrc="/bg/bg1.jpg"
        title="Women products"
        hoverText="Explore curated products designed for women."
        link="#"
      />
    </div>
  );
}


export default Circle;
