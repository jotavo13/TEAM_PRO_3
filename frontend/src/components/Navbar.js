import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom';
import AccountInfo from './AccountInfo';


		  
function Navbar() {
    return (
		<div className="navbar">
			<NavLink to={'/'}>
				<button>Home</button>
			</NavLink>
			<NavLink to={'/new'}>
				<button>Add Video</button>
			</NavLink>
			<AccountInfo />
		</div>
	)
}

export default Navbar;