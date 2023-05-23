import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Route, Routes, useParams } from 'react-router-dom';
import Videos from './pages/Videos';
import NewVideo from './pages/NewVideo';
import UpdateVideo from './pages/UpdateVideo';
import TopBar from './components/TopBar';
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useEffect, useState } from 'react';
import AccountInfo from './components/AccountInfo';
import SearchBar from './components/SearchBar';


function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  let routes;

  // use effect to check local storage for logged in user
  useEffect (() =>{
    const locallyStorredUser = localStorage.getItem("user")
    if(locallyStorredUser){
      setUser(JSON.parse(locallyStorredUser))
    }

  }, [])


//----- loggedInState-------------
const [usernameState, setUsernameState] = useState("");
const [passwordState, setPasswordState] = useState("");
const [loggedInState, setLoggedInState] = useState(false);
const [videoState, setVideoState] = useState('');
const [searchBarState, setSearchBarState] = useState('');

const onChangeHandler = (e, setValue)=>{
  setValue(e.target.value)
};

const onSubmithandler = async (e) => {
  e.preventDefault();
  console.log("start submit handler")
  const username = usernameState;
  const password = passwordState;

  let userAttempt = {
      username: username,
      password: password
  }

  const options = {
  method: "POST", 
  headers: {
  "Content-Type": "application/json"
  },
    body: JSON.stringify(userAttempt)
  }   
  const responseData = await fetch("http://localhost:4000/auth/login", options)
  const loggedInUser = await responseData.json()
  console.log("logged in:", loggedInUser)
  

  
  if (loggedInUser){
    setLoggedInState(true);

    let userUrl = loggedInUser.id;
  
  console.log(loggedInState);
  // store loged in user in the browser so that component rendering does not reset it, 
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  console.log("logged In User", toString(loggedInUser._id));
  console.log("end submit handler")


    navigate(`/${userUrl}`);
}
else{
  // alert user of incorrect crednetials
  window.location.reload();
  navigate("/auth/login")
}
} // end on submit handler

const onSearchSubmitHandler = async (event) => {

  event.preventDefault();

  const url = `https://youtube-v31.p.rapidapi.com/search?q=${searchBarState}&part=snippet%2Cid&regionCode=US&maxResults=10`;

  const options = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  }
  
  const response = await fetch(url, options);
  const results = await response.json();

  await setVideoState(results);

  console.log(videoState.items);
  
}


//---------end of loggedInState


  routes = (
    <>

      {/* should the Navbar be here or in the return inside the main element but above the routes? */}
      

      <Routes>

        <Route exact={true} path='/:id' element={<Videos/>} />

        <Route path="/auth/signup" element={<Signup/>}/>

        <Route path='/:id/new' element={<NewVideo videoState={videoState} setVideoState={setVideoState}/>} />

        <Route path='/:id/edit' element={<UpdateVideo />} />


        <Route path="/auth/login" element={<Login loggedInState={loggedInState} onSubmitHandler={onSubmithandler} onChangeHandler={onChangeHandler} usernameState={usernameState} passwordState={passwordState} setPasswordState={setPasswordState} setUsernameState={setUsernameState} setLoggedInState={setLoggedInState}/>} />

        {/* fallback/catch-all route */}
        {/* <Route path='*' element={<Navigate to='/' replace />} /> */}

      </Routes>

    </>
  )

  return (
    <div className="App">

      <header>
      {/* <TopBar setLoggedInState={setLoggedInState} loggedInState= {loggedInState} /> */}
      </header>

      <main>
        <TopBar onChangeHandler={onChangeHandler} onSearchSubmitHandler={onSearchSubmitHandler} setSearchBarState={setSearchBarState} loggedInState={loggedInState} setLoggedInState={setLoggedInState}/>
        {routes}
      </main>
      
    </div>
  );
}

export default App;