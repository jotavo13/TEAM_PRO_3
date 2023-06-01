import React from "react";
import "./Video.css";
import { NavLink } from "react-router-dom";

function Video({ video, videoState }) {
  console.log("state function", videoState)

  // const timeFromEvent = console.log(video);

 const vidId = video._id;

function formatNumber(number) {

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  
  return number.toString();
}



const dateNew = new Date(video.publishTime);


const hours = dateNew.getHours();
const minutes = dateNew.getMinutes();
const seconds = dateNew.getSeconds();


const dateNormal = hours.toString().padStart(2, '0') + ':' +
                    minutes.toString().padStart(2, '0') + ':' +
                    seconds.toString().padStart(2, '0');


  return (
    <>
    <NavLink to={video.videoURL} target="_" className={"cardLink"}>
      <div class="card">
        <div className="video">
        
            <img src={video.thumbnail} alt="" className="thumbnail card-img-top" />
         
          <br></br>
          <div class="row">
          <div class="col-sm-6 bg text-white"style={{ width: "25%", height: "25%", backGround: "none"}}>
          <img src={video.channelThumbnail} alt="" className="channelThum" />
          <NavLink to={`/${vidId}/delete`}>
          <span className="remove" style={{color: "white"}}>REMOVE</span>
          </NavLink>
          </div>
          <div class="col-sm-6 bgtext-white" style={{ width: "75%", height: "25%"}} >
          <h3 id="topTitle">{video.title}</h3>
          <h4 id="midTitle">{video.channelTitle}</h4>
          <span className="inline">
            <h4 >{formatNumber(video.views)} views     </h4>
          </span>
          <span className="inline date">
            <h4>  {dateNormal}</h4>
          </span>
          </div>
            </div>
        </div>
      </div>
    </NavLink>
    </>
    
  );
}

export default Video;
