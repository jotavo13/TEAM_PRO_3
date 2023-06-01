import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewVideo.css";

function NewVideo({
  videoState,
  setVideoState,
  userID,
  searchBarState,
  setSearchBarState,
  onFinalSubmitHandler,
  finalVideoState,
  setFinalVideoState,
}) {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  // const [videoState, setVideoState] = useState('');

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const url = `https://youtube-v31.p.rapidapi.com/search?q=${searchBarState}&part=snippet%2Cid&regionCode=US&maxResults=10`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const results = await response.json();

    await setVideoState(results);

    console.log(videoState.items);
  };

  const onFinalChangeHandler = async (event) => {
    const confirmButton = document.getElementById("confirmButton");
    console.log(confirmButton);
	console.log(confirmButton.classList.contains("hidden"))
	if(confirmButton.classList.contains("hidden")){
		confirmButton.classList.toggle("hidden");
	}
	else{

	}
	for(let i = 0; i < videoState.items.length; i++) {
		let removeBorder = document.getElementById(`${i}_newcard`);
		if(i == event.target.classList.value){

		}
		else{
			removeBorder.classList.remove("videoborder")
		}
	}
	const toggledVideo = document.getElementById(`${event.target.classList.value}_newcard`)
	console.log(toggledVideo, toggledVideo.classList);
	if(toggledVideo.classList.contains("videoborder")){
		console.log('success');
		toggledVideo.classList.remove("videoborder")
		confirmButton.classList.toggle("hidden");
	}
	else{
		toggledVideo.classList.toggle("videoborder")
	}
    await setFinalVideoState(videoState.items[event.target.classList.value]);
  };

  // const onFinalSubmitHandler = async (event) => {
  // 	event.preventDefault();

  // 	const options = {
  // 		method: 'GET',
  // 		headers: {
  // 		  'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
  // 		  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  // 		}
  // 	}

  // 	const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${finalVideoState.id.videoId}`;

  // 	const response = await fetch(url, options);
  // 	const videoResults = await response.json();

  // 	const url2 = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${finalVideoState.snippet.channelId}`

  // 	const response2 = await fetch(url2, options);
  // 	const channelResults = await response2.json();

  // 	console.log(videoResults, channelResults)

  // 	let videoObject = {
  // 			title:  finalVideoState.snippet.title,
  // 			thumbnail: videoResults.items[0].snippet.thumbnails.maxres.url,
  // 			channelThumbnail: channelResults.items[0].snippet.thumbnails.default.url,
  // 			channelTitle: finalVideoState.snippet.channelTitle,
  // 			publishTime: finalVideoState.snippet.publishTime,
  // 			views: videoResults.items[0].statistics.viewCount,
  // 			videoURL: `https://www.youtube.com/watch?v=${finalVideoState.id.videoId}`,
  // 			categories: []
  // 	}

  // 	const postOption = {
  // 		method: 'POST',
  // 		headers: {
  // 			"Content-Type": "application/json"
  // 		},
  // 		body: JSON.stringify(videoObject)
  // 	}

  // 	const responseData = await fetch(`http://localhost:4000/${id}`, postOption);

  // 	const newVideoObject = await responseData.json();

  // 	await setSearchBarState('');

  // 	navigate(`/${userID}`);

  // }

  

  if (videoState === "") {
    return <div className="newvideo">Search for a video!</div>;
  } else {
    const videos = videoState.items.map((video, index) => {
		let cardID = `${index}_newcard`
      return (
        <div onClick={onFinalChangeHandler}  key={index} className={index} style={{width: "284px" , height: "200px", pointerEvents: 'none'}}>
          <div className="card cardLink newcard" id={cardID} style={{width: "284px" , height: "200px", pointerEvents: 'none'}}>
			
            <div className="video" style={{width: "284px" , height: "200px", pointerEvents: 'none'}} >
				

              <img src={video.snippet.thumbnails.high.url}  id="thumbnail card-img-top" className={index} style={{ width:"248px", height:"140px", pointerEvents: 'auto'}} />

              <h3 className={index} id="topTitle" style={{pointerEvents: 'auto'}}>
                {video.snippet.title}
              </h3>
              <h4 className={index} id="midTitle" style={{pointerEvents: 'auto'}}>
                {video.snippet.channelTitle}
              </h4>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="newvideo">
        <span className="vidName">Select one of the videos below:</span>
        <form onSubmit={onFinalSubmitHandler} id="confirmform">
          <button className="hidden" id="confirmButton">
            Confirm
          </button>
        </form>
       <div className="newvideosdiv"> {videos} </div> 
      </div>
    );
  }
}

export default NewVideo;
