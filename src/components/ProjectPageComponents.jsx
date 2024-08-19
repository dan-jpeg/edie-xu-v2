import './included-work.css'



export const IncludedWork = ({work}) => {
    return (
        <div className="work-included-container ">
            <p className="work-included-title ">{work.title}</p>
            <p className="work-included-material">{work.material}</p>
            <p className="work-included-dimensions">{work.dimensions}</p>
            <p className="work-included-year">{work.year}</p>
        </div>

    )
}


export const ImagesSingleColumn = ({images}) => {
    return (
        <div className="images-single">
            {images.map((image, index) => (
                <img src={image} key={index}/>
            ))}
        </div>
    )
}


export const ImageRow = ({images}) => {
    return (
        <div className="images-row">
            <div className="left-image">
                <img src={images[0]} alt="left-image"/>
            </div>
            <div className="right-image">
                <img src={images[1]} alt="right-image"/>
            </div>
        </div>
    )
}

export const PrevNextControls = () => {
    return (
        <div className="prev-next-container">
            <p className="previous-button">
                previous
            </p>
            <p className="next-button">
                next
            </p>
        </div>
    )
}
