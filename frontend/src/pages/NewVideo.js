import { React, useState } from 'react'
import './NewVideo.css'
		  
function NewVideo() {

	const [videoState, setVideoState] = useState('');
	const [searchBarState, setSearchBarState] = useState('');
	const [finalVideoState, setFinalVideoState] = useState('');

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
	  
		// const url2 = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${results.items[0].id.videoId}`;
	  
		// const response2 = await fetch(url2, options);
		// const results2 = await response2.json();
	  
		// const url3 = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${results.items[0].snippet.channelId}`
	  
		// const response3 = await fetch(url3, options);
		// const results3 = await response3.json();

	}

	const onFinalChangeHandler = async (event) => {
		
	}

	const onFinalSubmitHandler = async (event) => {

	}

	if(videoState === ''){
		return (
			<div className="newvideo">
				Hello
				<form onSubmit={onSubmitHandler}>
					<input type="text" name="searchBar" value={searchBarState} placeholder="Search" onChange={(e) => onChangeHandler(e, setSearchBarState)}/> 
					<input type="submit" value="Search" />
				</form>
			</div>
		)
	}
	else{
		const videos = videoState.items.map((video, index) => {
			console.log(video);
			return (
				<div onClick={onFinalChangeHandler}>
					<h1>{video.snippet.title}</h1>
				</div>
			)
		})
		return (
			<div className="newvideo">
				<form onSubmit={onSubmitHandler}>
					<input type="text" name="searchBar" value={searchBarState} placeholder="Search" onChange={(e) => onChangeHandler(e, setSearchBarState)}/> 
					<input type="submit" value="Search" />
				</form>
				{videos}
			</div>
		)
	}
}
		  
export default NewVideo;
		  