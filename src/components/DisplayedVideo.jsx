import ReactPlayer from "react-player/lazy";
import PropTypes from "prop-types";
import './videopage.css'

const DisplayedVideo = ({video}) => {
    return (
        <div className="displayed-video-container">
            <div className="video-title-container">
                <h2 className="video-title">{video.title}</h2>
                <div className="video-details">
                    <p>{video.year}</p>
                    <p>{video.duration}</p>
                </div>
            </div>


            {video.videoUrl ? (
                <div className="video-wrapper">
                    <ReactPlayer url={video.videoUrl} playing={true} width='100%' height='100%' />

                </div>


            ) : (
                <div className="video-player">
                    <p>Video not available</p>
                </div>
            )}
        </div>
    );
};



DisplayedVideo.propTypes = {
    video: PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        videoUrl: PropTypes.string,
        thumbnail: PropTypes.string
    }).isRequired
};

export default DisplayedVideo;