import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import PropTypes from "prop-types";
import "./videopage.css";

const DisplayedVideo = ({ video }) => {
  const [loading, setLoading] = useState(false);

  const handleReady = () => {
    setLoading(false);
  };

  return (
    <div className="displayed-video-container">
      {/* Full-screen loading module */}
      {/*{loading && (*/}
      {/*  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">*/}
      {/*    <div className="text-white text-center">*/}
      {/*      <p className="text-lg animate-pulse mb-4">Content loading...</p>*/}
      {/*      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className="video-title-container text-center">
        <h2 className="video-title pt-[39vh] text-sm pb-4">{video.title}</h2>
        <div className="video-details text-xs">
          <p>{video.year}</p>
          <p>{video.duration}</p>
        </div>
      </div>

      {/* Main Video */}
      {video.videoUrl ? (
        <div className="video-wrapper">
          <ReactPlayer
            url={video.videoUrl}
            playing={true}
            width="95%"
            height="100%"
            onReady={handleReady}
            controls={true}
          />
        </div>
      ) : (
        <div className="video-player">
          <p>Video not available</p>
        </div>
      )}

      {/* Second Video (Only if videoUrl2 exists) */}
      {video.videoUrl2 && (
        <div className="w-screen flex pt-4 justify-center items-center pr-[10px]">
          <ReactPlayer
            url={video.videoUrl2}
            playing={false}
            width="95%"
            height="100%"
            onReady={handleReady}
            controls={true}
          />
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
    videoUrl2: PropTypes.string, // Added second video URL
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default DisplayedVideo;
