import { React, useState, useEffect } from 'react'
import './SearchBar.css'
		  
function SearchBar({onChangeHandler, onSearchSubmitHandler, setSearchBarState, searchBarState}) {

	// const [searchBarState, setSearchBarState] = useState(null);


    return (
		<div className="searchbar">
			<form onSubmit={onSearchSubmitHandler}>
					<input type="text" name="searchBar" value={searchBarState} placeholder="Search" onChange={(e) => onChangeHandler(e, setSearchBarState)}/> 
					<input type="submit" value="Search" />
				</form>
		</div>
	)
}
		  
export default SearchBar
		  