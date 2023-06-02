import React from 'react'
import './TopBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import SearchBar from './SearchBar';


		  
function TopBar({setLoggedInState, loggedInState, onSearchSubmitHandler, onChangeHandler, searchBarState, videoState, setVideoState, setSearchBarState, userID, videos, setVideos}) {

    const sortHandler = async (e) => {
      e.preventDefault();
      console.log(e.target.id);
      let URL = `https://teampro3-back.onrender.com/${userID}/sortvideos/${e.target.id}`
      const fetchVideos = async () => {
        try{
          let responseData = await fetch(URL);
          let sortedVideos = await responseData.json();
          // console.log(allVideos);
          setVideos(sortedVideos);
        }
        catch(err){
          console.log(err);
        }
      }
      fetchVideos();  
    }
      
  if(loggedInState && window.location.pathname.slice(window.location.pathname.length - 3) == 'new'){
    return (
      <div className="navbar" data-bs-theme="dark">
      <Navbar bg="dark" expand="sm" className="topbar">
            <Container fluid>
              <Navbar.Brand href="#">
      
      
            <NavLink to={`/${userID}`}>
              <img src = "https://i.imgur.com/gtsLGPG.png" style={{width:"142px", margin:"0 0 0 56px"}}/>
            </NavLink>
      
      
      
          </Navbar.Brand>
          <div className="center">
                
                <SearchBar onSearchSubmitHandler= {onSearchSubmitHandler} onChangeHandler={onChangeHandler} setSearchBarState={setSearchBarState} searchBarState={searchBarState} />
              
        
              
          </div>
            </Container>
            <AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState} />
          </Navbar>
          </div>
        )
      
  }
  
  else if(loggedInState && window.location.pathname.slice(window.location.pathname.length - 6) == 'delete'){
    return(
      <div className="navbar" data-bs-theme="dark">
  {/* if not logged in, disable home button */}
  <Navbar bg="dark" expand="sm" className="topbar">
        <Container fluid>
          <Navbar.Brand href="#">
  
        <NavLink to={`/${userID}`}>
          <img src = "https://i.imgur.com/gtsLGPG.png" style={{width:"142px", margin:"0 0 0 56px"}}/>
        </NavLink>
  
  </Navbar.Brand>
    </Container>
    <AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState} />
  </Navbar>
  </div>
)

  }
  else if(loggedInState){
    return (
      <div className="navbar" data-bs-theme="dark">
  <Navbar bg="dark" expand="sm" className="topbar">
        <Container fluid>
          <Navbar.Brand href="#">
  
  
        <NavLink to={`/${userID}`}>
          <img src = "https://i.imgur.com/gtsLGPG.png" style={{width:"142px", margin:"0 0 0 56px"}}/>
        </NavLink>
  
  
  
      </Navbar.Brand>
      <div className="center">
              <NavDropdown title="Sort By" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={sortHandler} id='0'>
                  Lowest - Highest Views
                </NavDropdown.Item>
                <NavDropdown.Item onClick={sortHandler} id='1'>
                  Highest - Lowest Views
                </NavDropdown.Item>
                <NavDropdown.Item onClick={sortHandler} id='2'>
                  Oldest - Newest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={sortHandler} id='3'>
                  Newest - Oldest
                </NavDropdown.Item>
              </NavDropdown>
            
            <SearchBar onSearchSubmitHandler= {onSearchSubmitHandler} onChangeHandler={onChangeHandler} setSearchBarState={setSearchBarState} searchBarState={searchBarState} />
          
    
          
      </div>
        </Container>
        <AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState} />
      </Navbar>
      </div>
    )}
  
  else{
    return(
        <div className="navbar" data-bs-theme="dark">
    {/* if not logged in, disable home button */}
    <Navbar bg="dark" expand="sm" className="topbar">
          <Container fluid>
            <Navbar.Brand href="#">
    
          <NavLink to={`#`}>
            <img src = "https://i.imgur.com/gtsLGPG.png" style={{width:"142px", margin:"0 0 0 56px"}}/>
          </NavLink>
    
		</Navbar.Brand>
      </Container>
      <AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState} />
    </Navbar>
		</div>
	)}



}

export default TopBar;