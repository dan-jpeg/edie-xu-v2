import {exhibitions2} from "../data/projects-and-videos.js";
import Listing from "./Listing.jsx";
import './exhibtionSpread.css'
import { ImagesSingleColumn, ImageRow, ImageRowEqual, IncludedWork, PrevNextControls} from "./ProjectPageComponents.jsx";

const ExhibitionSpread = () => {

    return (
        <div className="exhibition-spread-container items-center content-center flex-col justify-start ">
            <p className="text-3xl pb-2 italic m-0 md:fixed md:top-20 md:right-20"> {exhibitions2[1].title}</p>
            <div className="exhibition-header-di justify-items-start pt-40">

                <p className="text-s pb-2 not-italic"> {exhibitions2[1].location}</p>
                <p className="text-s pb-3 not-italic m-0"> {exhibitions2[1].date}</p>

                <p className="text-sm not-italic "> {exhibitions2[1].header}</p>

            </div>

            <p className="pt-12  text-xs"> {exhibitions2[1].textContent.slice(0, 714)} </p>
            <p className="pt-12  text-xs"> {exhibitions2[1].textContent.slice(714, 1200)} </p>


            <div className="work-included-row" >
                <IncludedWork work={exhibitions2[1].workIncluded[0]}/>
                <IncludedWork work={exhibitions2[1].workIncluded[1]}/>
            </div>
            <ImageRowEqual images={[exhibitions2[1].images[6], exhibitions2[1].images[5]]}/>
            <ImagesSingleColumn images={exhibitions2[1].images.slice(1, 5)}/>
            <ImagesSingleColumn images={exhibitions2[1].images.slice(8, 9)}/>

            <ImageRow images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]}/>
            {/*<PrevNextControls/>*/}
        </div>
    )
}

export default ExhibitionSpread;


export const ExhibitionDefaultSpread = ({exhibition}) => {

    return (
        <div className="exhibition-spread-container items-center flex-col justify-start  gap-4">
            <p className="text-3xl pb-2 italic m-0 md:fixed md:top-20 md:right-20"> {exhibition.title}</p>
            <div className="exhibition-header-di justify-items-start w-2/3 ml-4 pt-40">

                <p className="text-s pb-2 not-italic "> {exhibition.location}</p>
                <p className="text-s pb-3 not-italic m-0"> {exhibition.date}</p>

                <p className="text-xs not-italic pt-12 text-center "> {exhibition.header}</p>
                <p className="text-sm not-italic pt-12 pb-16 font-bold text-justify"> {exhibition.textContent}</p>

            </div>

            {exhibition.workIncluded && exhibition.workIncluded.length > 0 && (
                <div className="work-included-row">
                    <IncludedWork work={exhibition.workIncluded[0]}/>
                    <IncludedWork work={exhibition.workIncluded[1]}/>
                </div>


            )}

            <ImagesSingleColumn images={exhibition.images}/>
            {/*<ImageRow images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]} />*/}
            {/*<PrevNextControls />*/}
        </div>
    )
}