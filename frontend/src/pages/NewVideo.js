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
		console.log("results", results)

		await setVideoState(results);

		console.log(videoState.items);
	  
	}

	const onFinalChangeHandler = async (event) => {
		const confirmButton = document.getElementById('confirmButton');
		console.log(confirmButton);
		confirmButton.classList.toggle('hidden');
		await setFinalVideoState(videoState.items[event.target.classList.value]);
	}


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
				<div className='card'>
				<div onClick={onFinalChangeHandler} key={index} className={index}>
					<p className={index}>{video.snippet.title}</p>
					<img src={video.snippet.thumbnails.default}/>
				</div>
				</div>
			)
		})
		return (
			<div className="newvideo">
        <span className="vidName">Select one of the videos below:</span>
				<form onSubmit={onFinalSubmitHandler}>
					<button className="hidden confirm" id="confirmButton">Confirm</button>
				</form>
				{videos}
			</div>
		)
	}
}

export default NewVideo;
