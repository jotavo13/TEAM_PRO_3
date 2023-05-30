import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewVideo.css";

function NewVideo({ videoState, setVideoState, userID }) {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  // const [videoState, setVideoState] = useState('');
  const [searchBarState, setSearchBarState] = useState("");
  const [finalVideoState, setFinalVideoState] = useState("");

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
    confirmButton.classList.toggle("hidden");
    await setFinalVideoState(videoState.items[event.target.classList.value]);
  };

  const onFinalSubmitHandler = async (event) => {
    event.preventDefault();

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${finalVideoState.id.videoId}`;

	let videoResults;
	let channelResults;

    try {
      const response = await fetch(url, options);
      videoResults = await response.json();
    } 
	catch (err) {
      console.log(err);
    }

    const url2 = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${finalVideoState.snippet.channelId}`;

    try {
      const response2 = await fetch(url2, options);
    channelResults = await response2.json();
    } 
	catch (err) {
      console.log(err);
    }

    console.log(finalVideoState);

    let thumbnail;
    let channelThumbnail;
    let views;

    if (videoResults && channelResults) {
      thumbnail = videoResults.items[0].snippet.thumbnails.maxres.url;
      channelThumbnail = channelResults.items[0].snippet.thumbnails.default.url;
      views = videoResults.items[0].statistics.viewCount;
    } 
	else {
      thumbnail = finalVideoState.snippet.thumbnails.high.url;
      channelThumbnail = " ";
	  views = 1;
    }
    let videoObject = {
      title: finalVideoState.snippet.title,
      thumbnail: thumbnail,
      channelThumbnail: channelThumbnail,
      channelTitle: finalVideoState.snippet.channelTitle,
      publishTime: finalVideoState.snippet.publishTime,
      views: views,
      videoURL: `https://www.youtube.com/watch?v=${finalVideoState.id.videoId}`,
      categories: []
    };

    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoObject),
    };

    const responseData = await fetch(`http://localhost:4000/${id}`, postOption);

    const newVideoObject = await responseData.json();

    navigate(`/${userID}`);
  };

  if (videoState === "") {
    return (
      <div className="newvideo">
        {/* hopefully we can eventually turn the search bar into a component so we have DRY code */}
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="searchBar"
            value={searchBarState}
            placeholder="Search"
            onChange={(e) => onChangeHandler(e, setSearchBarState)}
          />
          <input type="submit" value="Search" />
        </form>
        Hello
      </div>
    );
  } else {
    const videos = videoState.items.map((video, index) => {
      return (
        <div onClick={onFinalChangeHandler} key={index} className={index}>
          <h1 className={index}>{video.snippet.title}</h1>
        </div>
      );
    });
    return (
      <div className="newvideo">
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="searchBar"
            value={searchBarState}
            placeholder="Search"
            onChange={(e) => onChangeHandler(e, setSearchBarState)}
          />
          <input type="submit" value="Search" />
        </form>
        <form onSubmit={onFinalSubmitHandler}>
          <button className="hidden" id="confirmButton">
            Confirm
          </button>
        </form>
        {videos}
      </div>
    );
  }
}

export default NewVideo;
