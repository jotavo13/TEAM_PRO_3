import React from "react";
import "./Video.css";
import { NavLink } from "react-router-dom";

function Video({ video }) {
  // const timeFromEvent = console.log(video);

  const vidId = video._id;

  return (
    <>
    <NavLink to={video.videoURL} target="_" className={"cardLink"}>
      <div class="card">
        <div className="video">
        
            <img src={video.thumbnail} alt="" className="thumbnail card-img-top" />
         
          <br></br>
          <div className="row">
          <div className="col-sm-6 bg text-white"style={{ width: "25%", height: "25%", backGround: "none"}}>
          <img src={video.channelThumbnail} alt="" className="channelThum" />
          </div>
          <div className="col-sm-6 bgtext-white" style={{ width: "75%", height: "25%"}} >
          <h3 id="topTitle label">{video.title}</h3>
          <h4 id="midTitle label">{video.channelTitle}</h4>
          <span className="inline">
            <h4 className="label">{video.views} views </h4>
          </span>
          <span className="inline">
            <h4 className="label">{video.publishTime}</h4>
          </span>
          <NavLink to={`/${vidId}/delete`}>
          <span style={{color: "white"}}>REMOVE</span>
          </NavLink>
          </div>
            </div>
        </div>
      </div>
    </NavLink>
    </>
    
  );
}

export default Video;
