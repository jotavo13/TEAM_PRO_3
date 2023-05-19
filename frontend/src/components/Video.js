import React from 'react'
import './Video.css'
import { NavLink } from 'react-router-dom'

		  
function Video({video}) {

	const timeFromEvent = 

	console.log(video)
    return (
		<NavLink to={video.videoURL}>
			<div className="video">
				<img src={video.thumbnail} alt='' />
				<img src={video.channelThumbnail} alt='' />
				<h3>{video.title}</h3>
				<h4>{video.channelTitle}</h4>
				<h4>{video.publishTime}</h4>
				<h4>{video.views}</h4>
			</div>
		</NavLink>
	)
}
		  
export default Video
		  