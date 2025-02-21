import { ImagesSingleColumn, IncludedWork } from "./ProjectPageComponents.jsx";

const FromEarthAndUp = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/FROM_EARTH_AND_UP00001.jpeg?alt=media&token=4d20ba91-2f10-4e4c-8690-767554e798c9",
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/FROM_EARTH_AND_UP00002.jpeg?alt=media&token=ae265c46-4f8a-4baf-bb01-c010ae5f3edc",
  ];

  return (
    <div className="displayed-project-container cursor-default scrollbar-hide pb-20 md:pb-0">
      <div className="displayed-title-container text-center">
        <div className="work-included-container">
          <p className="work-included-title italic pb-10 text-sm ">
            FROM EARTH AND UP
          </p>
          <p className="work-included-material">
            Photographed in April of 2024
          </p>

          <p className="work-included-dimensions">Stoneware and Indigo dye </p>
          <p className="work-included-year">61 x 19 x 4 (cm)</p>
          <p className="work-included-year">Gui Zhou, China)</p>
        </div>
        <div className="fixed  md:fixed bottom-[30vh] left-[10vw] flex flex-col  italic justify-center place-items-center"></div>
      </div>
      <div className="project-image-container">
        <img className="images-single" src={images[0]} alt="img-1" />
        <div className="grid grid-cols-3     text-[12px] ">
          <div className="col-span-3 italic  mt-4">
            <p>
              I brought a hand-built ceramic piece to Guizhou to create this
              documentation and process-based project that investigates the
              culture and ritual of the traditional Gui Zhou craft of indigo
              dye.{" "}
            </p>
          </div>

          <div className="col-span-3  pt-4 pb-6">
            <p>
              Like fabric, the ceramic piece is dipped again and again into the
              cement vat filled with indigo dye at 独山(Du Shan, Gui Zhou,
              China). Over time, the indigo, which was once planted and
              harvested, soaks into the skin and pores of the hand and clay.
              Inspired by the shape of a boat, the ceramic piece is hand-built
              from a grog-based clay (the same material as the saggers that were
              once used to protect porcelain pieces during the wood firing
              process).
            </p>
          </div>
          <img
            className="  images-single col-span-3 "
            src={images[1]}
            alt="img-1"
          />
          <div className="col-span-3 py-10">
            <p>
              Indigo dyeing in Guizhou follows a centuries-old traditional
              process, beginning with the cultivation of Indigofera tinctoria,
              the indigo plant. Farmers plant seeds in spring and tend to the
              crops through summer, ensuring healthy growth. By late summer, the
              indigo plants are harvested when they reach full maturity. The
              leaves are then carefully picked and fermented to produce indigo
              paste, known as jinsuo. Next, the paste undergoes a fermentation
              process in large cement vats, where it is mixed with lime and
              water, creating a rich, dark pigment. For dyeing,
              textiles—typically hemp or cotton—are soaked in the indigo vat and
              repeatedly dipped to build up color, allowing the fabric to
              oxidize in the air between dips. After sufficient layers of dye
              are applied, the fabric is left to dry. This method, is passed
              down through generations and is still practiced today. It is used
              to dye everyday clothes including wedding garments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromEarthAndUp;
