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






const formatDate = (date) => {

  let relativeTime;

  let dateNew = new Date();


  let todaysDay = dateNew.getDate();
  let todaysYear = dateNew.getFullYear();
  let todaysMonth = dateNew.getMonth();
  let todaysHour = dateNew.getHours();
  let todaysMinute = dateNew.getMinutes();

  let videoYear = +date.slice(0,4);
  let videoMonth = +date.slice(5,7) - 1;
  let videoDay = +date.slice(8,10);
  let videoHour = +date.slice(11,13);
  let videoMinute = +date.slice(14,16);
  console.log(date);
  console.log(todaysDay, videoDay);

  console.log('date', dateNew.getDate(), videoDay, dateNew.getFullYear(), videoYear, dateNew.getMonth(), videoMonth, todaysHour);


  if(todaysYear > videoYear){
    relativeTime = videoYear - todaysYear;
    relativeTime = relativeTime * (-1);
    if(relativeTime == 1){
      return `${relativeTime.toString()} year ago`;
    }
    else{
      return `${relativeTime.toString()} years ago`;
    }
  }
  else if(todaysMonth > videoMonth){
    relativeTime = videoMonth - todaysMonth;
    relativeTime = relativeTime * (-1);
    if(relativeTime == 1){
      return `${relativeTime.toString()} month ago`;
    }
    else {
      return `${relativeTime.toString()} months ago`;
    }
  }
  else if(todaysDay > videoDay){
    relativeTime = videoDay - todaysDay;
    relativeTime = relativeTime * (-1);
    if(relativeTime == 1){
      return `${relativeTime.toString()} day ago`;
    }
    else {
      return `${relativeTime.toString()} days ago`;
    }
  }
  else if(todaysHour > videoHour){
    console.log(todaysHour, videoHour)

    relativeTime = videoHour - todaysHour;
    relativeTime = relativeTime * (-1);
    if(relativeTime == 1){
      return `${relativeTime.toString()} hour ago`;
    }
    else {
      return `${relativeTime.toString()} hours ago`;
    }
  }
  else{
    console.log(videoMinute, todaysMinute)
    relativeTime = videoMinute - todaysMinute;
    relativeTime = relativeTime * (-1);
    if(relativeTime == 1){
      return `${relativeTime.toString()} minute ago`;
    }
    else {
      return `${relativeTime.toString()} minutes ago`;
    }
  }




}


const dateNormal = '';

// hours.toString().padStart(2, '0') + ':' +
//                     minutes.toString().padStart(2, '0') + ':' +
//                     seconds.toString().padStart(2, '0');


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
            <h4>  {formatDate(video.publishTime)}</h4>
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
