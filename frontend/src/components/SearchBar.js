import { React, useState, useEffect } from 'react'
import './SearchBar.css'
		  
function SearchBar() {

	const [searchState, setSearchState] = useState(null);

	useEffect(() => {
		
	})

    return (
		<div className="searchbar">
			<form>
				<input type="text"></input>
				<input type="submit"></input>
			</form>
		</div>
	)
}
		  
export default SearchBar
		  