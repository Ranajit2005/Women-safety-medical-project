import CircleCard from "./CircleCard";

function App() {
  return (
    <div className="flex flex-wrap justify-around p-5 sm:p-7 gap-3 sm:gap-5  ">
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Women health"
        hoverText="Learn about essential health tips and well-being."
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Substances and women's body"
        hoverText="Understand how substances affect women's health."
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Community and blogs"
        hoverText="Join the conversation and share your experiences."
      />
      <CircleCard
        imageSrc="backgroundSignUp.jpg"
        title="Women products"
        hoverText="Explore curated products designed for women."
      />
    </div>
  );
}

export default App;
