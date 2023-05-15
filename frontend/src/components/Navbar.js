import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom';
		  
function Navbar() {
    return (
		<div className="navbar">
			<NavLink to={'/'}>
				<button>Home</button>
			</NavLink>
			<NavLink to={'/new'}>
				<button>Add Video</button>
			</NavLink>
		</div>
	)
}

export default Navbar;