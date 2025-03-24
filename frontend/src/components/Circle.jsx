import CircleCard from "./CircleCard";

function App() {
  return (
    <div className="flex flex-wrap justify-around px-5 sm:px-7 gap-3 sm:gap-5  ">
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Women health"
        hoverText="Learn about essential health tips and well-being."
        link="#"
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Substances and women's body"
        hoverText="Understand how substances affect women's health."
        link="#"
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Community and blogs"
        hoverText="Join the conversation and share your experiences."
        link="#"
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Women products"
        hoverText="Explore curated products designed for women."
        link="#"
      />
    </div>
  );
}

export default App;
