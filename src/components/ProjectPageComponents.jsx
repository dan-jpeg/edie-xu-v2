import "./included-work.css";

export const IncludedWork = ({ work }) => {
  return (
    <div className=" text-[11px] grid grid-cols-3  gap-0 w-full ">
      <div className="col-span-2 flex space-x-4 flex-row">
        <p className="work-included-material  ">{work.material}</p>
        <p className="work-included-dimensions">{work.dimensions}</p>
      </div>
      <p className="work-included-title col-span-1 italic ">{work.title}</p>
    </div>
  );
};

export const ImagesSingleColumn = ({ images }) => {
  return (
    <div className="images-single object-fill w-full">
      {images.map((image, index) => (
        <img src={image} key={index} />
      ))}
    </div>
  );
};

export const ImageRow = ({ images }) => {
  return (
    <div className="images-row">
      <div className="left-image">
        <img src={images[0]} alt="left-image" />
      </div>
      <div className="right-image">
        <img src={images[1]} alt="right-image" />
      </div>
    </div>
  );
};

export const ImageRowEqual = ({ images }) => {
  return (
    <div className="images-row-even">
      <div className="left-image">
        <img src={images[0]} alt="left-image" />
      </div>
      <div className="right-image">
        <img src={images[1]} alt="right-image" />
      </div>
    </div>
  );
};

export const PrevNextControls = () => {
  return (
    <div className="prev-next-container">
      <p className="previous-button">previous</p>
      <p className="next-button">next</p>
    </div>
  );
};
