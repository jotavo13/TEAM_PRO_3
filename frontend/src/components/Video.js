import React from "react";
import "./Video.css";
import { NavLink } from "react-router-dom";

function Video({ video }) {
  // const timeFromEvent = console.log(video);
  return (
    <NavLink to={video.videoURL} target="_">
      <div class="card">
        <div className="video">
        
            <img src={video.thumbnail} alt="" className="thumbnail card-img-top" />
         
          <br></br>
          <div class="row">
          <div class="col-sm-6 bg text-white"style={{ width: "25%", height: "25%", backGround: "none"}}>
          <img src={video.channelThumbnail} alt="" className="channelThum" />
          </div>
          <div class="col-sm-6 bgtext-white" style={{ width: "75%", height: "25%"}} >
          <h3 id="topTitle">{video.title}</h3>
          <h4 id="midTitle">{video.channelTitle}</h4>
          <span className="inline">
            <h4>{video.views} views </h4>
          </span>
          <span className="inline">
            <h4>{video.publishTime}</h4>
          </span>
          </div>
            </div>
        </div>
      </div>
    </NavLink>
    
  );
}

export default Video;
