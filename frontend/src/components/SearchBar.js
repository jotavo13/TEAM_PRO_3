import { React, useState, useEffect } from 'react'
import './SearchBar.css'
		  
function SearchBar({onChangeHandler, onSearchSubmitHandler, setSearchBarState, searchBarState}) {

	// const [searchBarState, setSearchBarState] = useState(null);


    return (
		<div className='surround'>
		<div className="searchbar">
			<form onSubmit={onSearchSubmitHandler} className="searchform">
					<input type="text" name="searchBar" value={searchBarState} placeholder="Search" onChange={(e) => onChangeHandler(e, setSearchBarState)}/> 
					<input type="submit" value="Search" className='search'/>
				</form>
		</div>
		</div>
	)
}
		  
export default SearchBar
