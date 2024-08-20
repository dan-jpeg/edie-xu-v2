import {exhibitions2} from "../data/projects-and-videos.js";
import Listing from "./Listing.jsx";
import './exhibtionSpread.css'
import { ImagesSingleColumn, ImageRow, ImageRowEqual, IncludedWork, PrevNextControls} from "./ProjectPageComponents.jsx";

const ExhibitionSpread = () => {

    return (
        <div className="exhibition-spread-container">
            <div className="exhibition-header-div">

                <h2> {exhibitions2[1].title}</h2>
                <p> {exhibitions2[1].date}</p>
            </div>
                <p> {exhibitions2[1].textContent.slice(0, 759)} </p>


            <div className="work-included-row">
                <IncludedWork work={exhibitions2[1].workIncluded[0]}/>
                <IncludedWork work={exhibitions2[1].workIncluded[1]}/>
            </div>
            <ImageRowEqual images={[exhibitions2[1].images[6], exhibitions2[1].images[5]]}/>
            <ImagesSingleColumn images={exhibitions2[1].images.slice(1, 5)}/>
            <ImagesSingleColumn images={exhibitions2[1].images.slice(8, 9)}/>

            <ImageRow images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]}/>
            <PrevNextControls/>
        </div>
    )
}

export default ExhibitionSpread;


export const ExhibitionDefaultSpread = ({exhibition}) => {

    return (
        <div className="exhibition-spread-container">
            <div className="exhibition-header-div">
                <p> {exhibition.title}</p>
                <p className="header-date"> {exhibition.date}</p>
                <p> {exhibition.location}</p>

                <p> {exhibition.header}</p>

            </div>

            {exhibition.workIncluded && exhibition.workIncluded.length > 0 && (
                <div className="work-included-row">
                    <IncludedWork work={exhibition.workIncluded[0]}/>
                    <IncludedWork work={exhibition.workIncluded[1]}/>
                </div>


            )}

            <ImagesSingleColumn images={exhibition.images}/>
            {/*<ImageRow images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]} />*/}
            <PrevNextControls />
        </div>
    )
}