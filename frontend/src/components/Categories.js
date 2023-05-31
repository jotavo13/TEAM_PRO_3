import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Categories.css";

function Categories({ categories, setCategories, userID, videos, setVideos }) {
  const { id } = useParams();

  let [newCategoryState, setNewCategoryState] = useState("");
  let [categoryState, setCategoryState] = useState("");

  const onChangeHandler = (e) => {
    setNewCategoryState(e.target.value);
  };

  useEffect(() => {
    const URL = `http://localhost:4000/${userID}/categories`;

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
      userId: id,
    };

    const postOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryAddition),
    };

    const responseData = await fetch(
      `http://localhost:4000/${id}/categories/${newCategoryState}`,
      postOption
    );

    const newCategoryObject = await responseData.json();

    console.log(event.target);
    hideAddCategory(event);
    // const toggleCategory = document.getElementById(event.target.classList);
    // toggleCategory.classList.toggle('hidden');
    // navigate(`/${userID}`);
  };

  const onCategoryClickHandler = async (event) => {
    event.preventDefault();

	if(event.target.tagName != 'BUTTON'){
		const url = `http://localhost:4000/${id}/categories/${event.target.id}`;
	
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
  };

  const hideAddCategory = (e) => {
    e.preventDefault();
    console.log("this", e.target.classList);
    const addCategory = document.getElementById(e.target.classList);
    addCategory.classList.toggle("hidden");
    setCategoryState(e.target.id);
    // setNewCategoryState(e.target);
    // console.log(categories[0])
    // setNewCategoryState(categories[0].name)
  };

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
      return (
        <li className="nav-item">
          <a onClick={onCategoryClickHandler} className="nav-link active" aria-current="page" id={category.name}>
            <svg className="bi me-2" width="16" height="16" id={category.name}></svg>
            {category.name}
            <button
              className={index}
              onClick={hideAddCategory}
			  id={category.name}
            >
              +
            </button>
          </a>
          <div className="hidden" id={index}>
            <form onSubmit={onSubmitHandler} className={index}>
              <select id="title" name="title" onChange={onChangeHandler}>
                {videoTitles}
              </select>
              <input type="submit" value="Add" />
              {/* <button onClick={hideCreateCategories}>Cancel</button> */}
            </form>
          </div>
        </li>
      );
    });
  }

  return (
    <ul className="nav nav-pills flex-column mb-auto categoriesList">
      {categoriesList}
    </ul>
  );
}

export default Categories;
