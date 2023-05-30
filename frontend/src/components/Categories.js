import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Categories.css'
		  
function Categories({categories, setCategories}) {

	const {id} = useParams();

	// console.log("id",id)

	let categoriesList;

	if(categories == null){
		categoriesList = <h2>Loading...</h2>;
	}
	else{
		categoriesList = categories.map((category, index) => {
			return (
				<li className="nav-item">
					<a href="#" className="nav-link active" aria-current="page">
						<svg className="bi me-2" width="16" height="16">
						</svg>
						{category.name}
					</a>
			  	</li>
			)
		})
	}

    return (
		<ul className="nav nav-pills flex-column mb-auto categoriesList">
			{categoriesList}
		</ul>
	)

}
		  
export default Categories;