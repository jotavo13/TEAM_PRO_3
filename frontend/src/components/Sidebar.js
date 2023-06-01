import { React, useEffect, useState } from "react";
import "./Sidebar.css";
import {BsCameraVideo} from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom";
import Categories from './Categories';
import Button from "react-bootstrap/Button";

function Sidebar({username, userID, videos, setVideos}) {

  let navigate = useNavigate();

  const [inputBarState, setInputBarState] = useState('');
  const [categories, setCategories] = useState(null);

	const URL = `http://localhost:4000/${userID}/categories`;

	useEffect(() => {
		const fetchCategories = async () => {
			try{
				let responseData = await fetch(URL);
				let allCategories = await responseData.json();
				// console.log(allVideos);
				await setCategories(allCategories);
				console.log("categories", categories);
			}
			catch(err){
				console.log(err);
			}
		}
		fetchCategories();
	}, [])


  const categoryAddButton = async (e, index) => {
    const addCategoryDiv = document.getElementById('addCategoryDiv');
		console.log(addCategoryDiv);
		addCategoryDiv.classList.toggle('hidden');
  }

  const onChangeHandler = async (e, setValue) => {
		setValue(e.target.value);
	}

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    let newCategory = {
      name: inputBarState
    }
  
  const postOption = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCategory)
  }

    const responseData = await fetch(`http://localhost:4000/${userID}/categories`, postOption);

    const newCategoryObject = await responseData.json();

		const fetchCategories = async () => {
			try{
				let responseData = await fetch(`http://localhost:4000/${userID}/categories`);
				let allCategories = await responseData.json();
				// console.log(allVideos);
				await setCategories(allCategories);
				console.log("categories", categories);
			}
			catch(err){
				console.log(err);
			}
		}
		fetchCategories();

    setInputBarState('');

    hideCreateCategories(e);
  }

  const hideCreateCategories = (e) => {
    e.preventDefault();
    const addCategoryDiv = document.getElementById('addCategoryDiv');
		console.log(addCategoryDiv);
		addCategoryDiv.classList.toggle('hidden');
  }

  return (
  
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidecolumn"
        style={{width: "280px"}}
      >
        <NavLink to={`/${userID}/new`}>
        <Button className="add-button"><BsCameraVideo/>
        <br/><span >Add Video</span></Button>
        </NavLink>

        <div className="fs-4 categories">Categories<button onClick={categoryAddButton}>+</button></div>
        <div className='hidden' id='addCategoryDiv'>				
          <form onSubmit={onSubmitHandler}>
            <input type="text" name="searchBar" value={inputBarState} placeholder="Add Category Here" onChange={(e) => onChangeHandler(e, setInputBarState)}/> 
            <input type="submit" value="Create" />
            <button onClick={hideCreateCategories}>Cancel</button>
				  </form>
        </div>
        <hr />
        <Categories categories={categories} setCategories={setCategories} userID={userID} videos={videos} setVideos={setVideos}/>
        <hr />
        <div className="dropdown">
          
            <img
              src="https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg"
              alt="account icon"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{username}</strong>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Sidebar;
