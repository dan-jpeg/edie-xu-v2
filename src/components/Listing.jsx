import { Link } from 'react-router-dom';
import { exhibitions2 } from "../data/projects-and-videos.js";
import './Listing.css';
import { slugify } from '../helpers/slugify';

const Listing = ({ listing }) => {
    return (
        <Link to={`/exhibition/${slugify(listing.title)}`} className="listing-container">
            <div className="text-content">
                <h3>{listing.date}</h3>
                <h2>{listing.title}</h2>

                <p>{listing.category}</p>
                <p>{listing.location}</p>

            </div>
            <div className="image-content">
                <img src={listing.images[0]} alt="Art Image"/>
                {/*<div className="date">{listing.date}</div>*/}
            </div>
        </Link>
    );
};

export default Listing;