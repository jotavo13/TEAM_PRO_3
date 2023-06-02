import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Categories.css";
import {BsPencil} from "react-icons/bs"
import {BsTrash3} from "react-icons/bs"


function Categories({ categories, setCategories, userID, videos, setVideos }) {
  const { id } = useParams();

  let [newCategoryState, setNewCategoryState] = useState("");
  let [categoryState, setCategoryState] = useState("");
  let [categoryUpdateState, setCategoryUpdateState] = useState("");

  const onChangeHandler = (e) => {
    setNewCategoryState(e.target.value);
  };

  const onCategoryUpdateChangeHandler = (e) => {
	setCategoryUpdateState(e.target.value);
  }

  useEffect(() => {
    const URL = `https://teampro3-back.onrender.com/${userID}/categories`;

    const fetchCategories = async () => {
      try {
        let responseData = await fetch(URL);
        let allCategories = await responseData.json();
        // console.log(allVideos);
        await setCategories(allCategories);
        console.log("categories", categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(categoryState);

    let categoryAddition = {
      name: categoryState,
      userId: id
    };

    const postOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryAddition),
    };

    const responseData = await fetch(
      `https://teampro3-back.onrender.com/${id}/categories/${newCategoryState}`,
      postOption
    );

    const newCategoryObject = await responseData.json();

    console.log(event.target);
    hideAddCategory(event);
    // const toggleCategory = document.getElementById(event.target.classList);
    // toggleCategory.classList.toggle('hidden');
    // navigate(`/${userID}`);
  };

  const onCategoryUpdateSubmitHandler = async (event) => {
	event.preventDefault();

	let categoryUpdate = {
		name: categoryUpdateState,
		userId: id
	}

	const postOption = {
		method: "PUT",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(categoryUpdate),
	};

	const responseData = await fetch(
	`https://teampro3-back.onrender.com/${id}/categories/${categoryState}/edit`,
	postOption
	);

	const newUpdatedCategoryObject = await responseData.json();

    console.log("this", event.target.classList.value);
    const addCategory = document.getElementById(event.target.classList.value);
    addCategory.classList.toggle("hidden");

	const fetchCategories = async () => {
		try{
			let responseData = await fetch(`https://teampro3-back.onrender.com/${userID}/categories`);
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

  
  }

  const onDeleteSubmitHandler = async (e) => {
	e.preventDefault();

	const url = `https://teampro3-back.onrender.com/${id}/categories/${e.target.id}`;

	let categoryDelete = {
		name: e.target.id,
		userId: id
	}

	const postOption = {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(categoryDelete),
	};

	const responseData = await fetch(
		url,
		postOption
	);
	
	const newUpdatedCategoryObject = await responseData.json();	

	const fetchCategories = async () => {
		try {
		  let responseData = await fetch(`https://teampro3-back.onrender.com/${id}/categories`);
		  let newCategories = await responseData.json();
		  await setCategories(newCategories);
		} catch (err) {
		  console.log(err);
		}
	  };
	  fetchCategories();
  }

  const onCategoryClickHandler = async (event) => {
    event.preventDefault();

	if(event.target.tagName != 'BUTTON'){
		console.log(event.target.id);
		if(event.target.id != ''){
			const url = `https://teampro3-back.onrender.com/${id}/categories/${event.target.id}`;
		
			const fetchCategories = async () => {
			  try {
				let responseData = await fetch(url);
				let clickedVideos = await responseData.json();
				await setVideos(clickedVideos);
			  } catch (err) {
				console.log(err);
			  }
			};
			fetchCategories();

		}
		else{
			const url = `https://teampro3-back.onrender.com/${id}`;
		
			const fetchCategories = async () => {
			  try {
				let responseData = await fetch(url);
				let allVideos = await responseData.json();
				await setVideos(allVideos);
			  } catch (err) {
				console.log(err);
			  }
			};
			fetchCategories();

		}
	}
  };

  const hideAddCategory = (e) => {
    e.preventDefault();
    console.log("this", e.target.classList);
    const addCategory = document.getElementById(`${e.target.classList.value}`);
    addCategory.classList.toggle("hidden");
    setCategoryState(e.target.id);
    // setNewCategoryState(e.target);
    // console.log(categories[0])
    // setNewCategoryState(categories[0].name)
  };

  const hideEditCategory = (e) => {
	e.preventDefault();
    console.log("this", e.target);
    const addCategory = document.getElementById(`${e.target.classList}_category`);
    addCategory.classList.toggle("hidden");
	setCategoryUpdateState(e.target.id);
	setCategoryState(e.target.id);
  }

  // console.log("id",id)

  let categoriesList;
  let videoTitles;

  if (videos === "") {
  } else {
    videoTitles = videos.map((video, index) => {
      return (
        <option className={index} id={video.id}>
          {video.title}
        </option>
      );
    });
  }

  if (categories == null) {
    categoriesList = <h2>Loading...</h2>;
  } else {
    categoriesList = categories.map((category, index) => {
      
	let updateCategory = `${index}_category`
	let addVideoCategory = `${index}_add`
		
	return (
        <li className="nav-item">
          <a onClick={onCategoryClickHandler} className="nav-link active" aria-current="page" id={category.name}>
            <span>
				{category.name}
			</span>
            <button
              className={addVideoCategory}
              onClick={hideAddCategory}
			  id={category.name}
            >
              +
            </button>
			<button
              className={index}
              onClick={hideEditCategory}
			  id={category.name}
            >
              <BsPencil className={index}/>
            </button>
			<button
              className={index}
              onClick={onDeleteSubmitHandler}
			  id={category.name}
            >
              <BsTrash3 />
            </button>


          </a>
          <div className="hidden" id={addVideoCategory}>
            <form onSubmit={onSubmitHandler} className={addVideoCategory} id='formatform'>
              <select id="title" name="title" onChange={onChangeHandler}>
                {videoTitles}
              </select>
              <input className='categorybutton' type="submit" value="Add" />
              {/* <button onClick={hideCreateCategories}>Cancel</button> */}
            </form>
          </div>
		  <div className="hidden" id={updateCategory} >
		  		<form onSubmit={onCategoryUpdateSubmitHandler} className={updateCategory} id='formatform'>
					<input type="text" name="categoryUpdate" value={categoryUpdateState} onChange={(e) => onCategoryUpdateChangeHandler(e)}/> 
					<input className='categorybutton' type="submit" value="Confirm" />
				</form>
          </div>
        </li>
      );
    });
  }

  return (
    <ul className="nav nav-pills flex-column mb-auto categoriesList">
		{/* id={category.name} (removed from a and svg elements) */}
		<li className="nav-item">
			<a onClick={onCategoryClickHandler} className="nav-link active" aria-current="page" >
				None
			</a>
		</li>
      	{categoriesList}
    </ul>
  );
}

export default Categories;
