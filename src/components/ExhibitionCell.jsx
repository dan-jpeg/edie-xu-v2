import React from "react";

const ExhibitionCell = ({ title, year, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(1);

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  };

  const handleMouseLeave = () => {
    // setCurrentImageIndex(0)
  };

  return (
    <div
      // onClick={onClick}
      className="cursor-pointer flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="md:h-4  lg:h-[1vw] flex flex-col mb-5">
        <div className="flex   justify-between items-start w-full">
          <span className=" hover:opacity-15 max-w-[70%] leading-tight">
            {title}
          </span>
          <span className="font-alte-ha`as">{year.slice(0, 4)}</span>
        </div>
      </div>
      <div className="w-full pt-4 flex justify-center">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="h-[8vw] w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default ExhibitionCell;
