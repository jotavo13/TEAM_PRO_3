import { React, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './NewVideo.css'
		  
function NewVideo({videoState, setVideoState, userID, searchBarState, setSearchBarState, onFinalSubmitHandler, finalVideoState, setFinalVideoState}) {
	const {id} = useParams()
	console.log(id)
	const navigate = useNavigate();

	// const [videoState, setVideoState] = useState('');

	const onChangeHandler = (e, setValue) => {
		setValue(e.target.value);
	}

	const onSubmitHandler = async (event) => {

		event.preventDefault();

		const url = `https://youtube-v31.p.rapidapi.com/search?q=${searchBarState}&part=snippet%2Cid&regionCode=US&maxResults=10`;
	
		const options = {
		  method: 'GET',
		  headers: {
			'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
			'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
		  }
		}
	  
		const response = await fetch(url, options);
		const results = await response.json();

		await setVideoState(results);

		console.log(videoState.items);
	  
	}

	const onFinalChangeHandler = async (event) => {
		const confirmButton = document.getElementById('confirmButton');
		console.log(confirmButton);
		confirmButton.classList.toggle('hidden');
		await setFinalVideoState(videoState.items[event.target.classList.value]);
	}

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

	

	if(videoState === ''){
		return (
			<div className="newvideo">
				Search for a video!
			</div>
		)
	}
	else{
		const videos = videoState.items.map((video, index) => {
			return (
				<div onClick={onFinalChangeHandler} key={index} className={index}>
					<h1 className={index}>{video.snippet.title}</h1>
				</div>
			)
		})
		return (
			<div className="newvideo">
				<form onSubmit={onFinalSubmitHandler}>
					<button className="hidden" id="confirmButton">Confirm</button>
				</form>
				{videos}
			</div>
		)
	}
}
		  
export default NewVideo;
		  