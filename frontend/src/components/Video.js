import React from "react";
import "./Video.css";
import { NavLink } from "react-router-dom";

function Video({ video }) {
  const timeFromEvent = console.log(video);
  return (
    <NavLink to={video.videoURL} target="_">
		<div class="grid-container">
      <div className="video">
        <div class="card" style={{width: "18rem"}}>
        <img src={video.thumbnail} alt="" className="thumbnail" />
        </div>

        {/* <img src={video.thumbnail} alt="" className="thumbnail" /> */}
        <br></br>
        <img src={video.channelThumbnail} alt="" className="channelThum" />
        <h3>{video.title}</h3>
        <h4>{video.channelTitle}</h4>
        <span className="inline">
          <h4>{video.views}   views </h4>
        </span>
        <span className="inline">
          <h4>{video.publishTime}</h4>
        </span>
      </div>
	  </div>
    </NavLink>
  );
}

export default Video;
