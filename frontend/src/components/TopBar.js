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


		  
function TopBar({setLoggedInState, loggedInState, onSearchSubmitHandler, onChangeHandler, searchBarState, videoState, setVideoState, setSearchBarState}) {
    return (
		<div className="navbar" data-bs-theme="dark">

<Navbar bg="dark" expand="sm" >
      <Container fluid>
        <Navbar.Brand href="#">
			<NavLink to={'/'}>
				<img src = "https://i.imgur.com/c6kNr4C.png" style={{width:"100px"}}/>
			</NavLink>
		</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Sort By" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <SearchBar onSearchSubmitHandler= {onSearchSubmitHandler} onChangeHandler={onChangeHandler} setSearchBarState={setSearchBarState} searchBarState={searchBarState} />
        
  
        
        </Navbar.Collapse>
      </Container>
      <AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState} />
    </Navbar>

			{/* <NavLink to={'/'}>
				<button>Logo (Home)</button>
			</NavLink> */}
			{/* Search Bar Here */}
			{/* <NavLink to={'/new'}>
				<button>Add Video</button>
			</NavLink>
			<AccountInfo setLoggedInState={setLoggedInState} loggedInState= {loggedInState}/> */}
		</div>
	)
}

export default TopBar;