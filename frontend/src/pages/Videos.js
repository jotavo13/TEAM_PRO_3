import React, {useEffect, useState } from 'react'
import './Videos.css'
import Video from '../components/Video';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router';

function Videos({username, userID, videos, setVideos}) {

	const {id} = useParams();
	console.log("id",id)

	const URL = `http://localhost:4000/${id}`;

	useEffect(() => {
		const fetchVideos = async () => {
			try{
				let responseData = await fetch(URL);
				let allVideos = await responseData.json();
				// console.log(allVideos);
				setVideos(allVideos);
			}
			catch(err){
				console.log(err);
			}
		}
		fetchVideos();
	}, [])

	let videoList;


	if(videos === ''){
		videoList = <h2>Loading...</h2>;
	}
	else{
		videoList = videos.map((video, index) => {
			return (
				<div className='videoCards'>
				<Video key={index} video={video} />
				</div>
			)
		})
	}

    return (
		<div className="videos">
			<Sidebar username={username} userID={userID} videos={videos} setVideos={setVideos}/>
			<div className="videosection">
				<ul>{videoList}</ul>
			</div>
			
		</div>
	)
}
		  
export default Videos
		  