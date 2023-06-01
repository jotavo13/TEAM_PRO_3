import { React, useEffect } from "react";
import "./Sidebar.css";
import {BsCameraVideo} from "react-icons/bs"
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Sidebar({username, userID}) {

  useEffect(() => {});
  console.log(username)

  return (
  
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidecolumn"
        style={{width: "280px"}}
      >
        <NavLink to={`/${userID}/new`}>
        <Button className="add-button"><BsCameraVideo/>
        <br/><span >Add Video</span></Button>
        </NavLink>
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
          <br/>
          <NavLink to={`/${userID}/categories`}>
          <div className="fs-4 categories">Categories</div>
          </NavLink>
        </a>

        <hr />
        <ul className="nav nav-pills flex-column mb-auto categoriesList">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <svg className="bi me-2" width="16" height="16">
              </svg>
              Funny
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
              </svg>
              Horror
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
               
              </svg>
              Cat3
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                
              </svg>
              Cat4
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                
              </svg>
              Cat5
            </a>
          </li>
        </ul>
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
