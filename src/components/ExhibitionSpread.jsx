import {exhibitions2} from "../data/projects-and-videos.js";
import Listing from "./Listing.jsx";
import './exhibtionSpread.css'
import { ImagesSingleColumn, ImageRow, IncludedWork, PrevNextControls} from "./ProjectPageComponents.jsx";

const ExhibitionSpread = () => {

    return (
        <div className="exhibition-spread-container">
            <div className="exhibition-header-div">

                <h2> {exhibitions2[0].title}</h2>
                <p> {exhibitions2[0].date}</p>
            </div>
                <p> If, as Kant claimed, schematization is the very mechanism for human beings’ use of intelligence,
                    then vision can be considered a premise for human reason. In the realm of contemporary art, OpArt
                    once explored the relation between visual illusion and human cognition, involving whatgestalt
                    psychology researched the correlation between perceptual fields and perceived objects. Inthe history
                    of ideas, one can trace back to the studies on intentionality by Franz Brentano, aphilosopher and
                    founder of act psychology from Austro-Hungarian Empire in the late 19thcentury. His significant
                    contribution was to envisages the potential psychological objects as partsof something actual. In
                    brief, within intentional activities, there exists an asymmetry betweencognition and consciousness,
                    namely, the impossible of correspondence between perceivedobject and perception itself. Till to the
                    aesthetic notion proposed by object-oriented ontology, thevery asymmetry expressed in artworks is
                    categorized as “non-subjective correlation.” Therefore,the idea of arts is anchored based on a
                    manifestation of impersonal elements. </p>


            <div className="work-included-row">
                <IncludedWork work={exhibitions2[0].workIncluded[0]}/>
                <IncludedWork work={exhibitions2[0].workIncluded[1]}/>
            </div>

            <ImagesSingleColumn images={exhibitions2[1].images.slice(1, 9)}/>
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
                <p> {exhibition.date}</p>
                <p> {exhibition.header}</p>

            </div>
            <div className="work-included-row">
                <IncludedWork work={exhibition.workIncluded[0]} />
                <IncludedWork work={exhibition.workIncluded[1]} />
            </div>

            <ImagesSingleColumn images={exhibition.images} />
            {/*<ImageRow images={[exhibitions2[1].images[10], exhibitions2[1].images[9]]} />*/}
            <PrevNextControls />
        </div>
    )
}