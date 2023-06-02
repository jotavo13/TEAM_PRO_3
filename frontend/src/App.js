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
import DeleteVideo from './pages/DeleteVideo';


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
const [finalVideoState, setFinalVideoState] = useState('');
const [videos, setVideos] = useState('');


const [userID, setUserID] = useState('');

const onChangeHandler = (e, setValue)=>{
  setValue(e.target.value)
};

const onSubmitHandler = async (e) => {
  if(e){
    e.preventDefault()
  }
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
  const responseData = await fetch("https://teampro3-back.onrender.com/auth/login", options)
  const localStoredUser = localStorage.getItem('user');
  
  let loggedInUser;
  if(localStoredUser){
    console.log("local", await JSON.parse(localStoredUser))
    loggedInUser = await JSON.parse(localStoredUser);
    setUsernameState(loggedInUser.username);
  }
  else{
    loggedInUser = await responseData.json()
  }
  console.log("logged in:", loggedInUser)
  
  if (loggedInUser){

    setLoggedInState(true);

    setUserID(loggedInUser.id);

    let userUrl = loggedInUser.id;
  
  console.log(loggedInState);
  // store loged in user in the browser so that component rendering does not reset it, 
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  console.log("logged In User", userID);
  console.log("end submit handler")

  if(e){
    navigate(`/${userUrl}`);
  }
}
else{
  // alert user of incorrect crednetials
  window.location.reload();
  navigate("/auth/login");
}
} // end on submit handler

const onSearchSubmitHandler = async (event) => {

  event.preventDefault();

  console.log(window.location.pathname.slice(window.location.pathname.length - 3))

  if(window.location.pathname.slice(window.location.pathname.length - 3) == 'new'){

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
  
    await setSearchBarState('');
  }
  else{

    const url = `http://localhost:4000/${userID}/videos/${searchBarState}`;
      
    const response = await fetch(url);
    const results = await response.json();
  
    await setVideos(results);

    await setSearchBarState('');

  }
  
}
//---------end of loggedInState

const onFinalSubmitHandler = async (event) => {
  event.preventDefault();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  }

  const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${finalVideoState.id.videoId}`;
  
  const response = await fetch(url, options);
  const videoResults = await response.json();
  
  const url2 = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${finalVideoState.snippet.channelId}`
  
  const response2 = await fetch(url2, options);
  const channelResults = await response2.json();

  console.log(videoResults, channelResults)

  let videoObject = {
      title:  finalVideoState.snippet.title,
      thumbnail: videoResults.items[0].snippet.thumbnails.maxres.url,
      channelThumbnail: channelResults.items[0].snippet.thumbnails.default.url,
      channelTitle: finalVideoState.snippet.channelTitle,
      publishTime: finalVideoState.snippet.publishTime,
      views: videoResults.items[0].statistics.viewCount,
      videoURL: `https://www.youtube.com/watch?v=${finalVideoState.id.videoId}`,
      categories: []
  }
  
  const postOption = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(videoObject)
  }

  
  
  const responseData = await fetch(`http://localhost:4000/${userID}`, postOption);

  const newVideoObject = await responseData.json();

  await setSearchBarState('');

  navigate(`/${userID}`);

}


useEffect (() =>{

  const localStoredUser = localStorage.getItem('user');
  if(localStoredUser){
    console.log("local stored: ",localStoredUser)
    onSubmitHandler();
  }

}, [])

  routes = (
    <>

      {/* should the Navbar be here or in the return inside the main element but above the routes? */}

      <Routes>

        <Route path='/:id' element={<Videos username={usernameState} userID={userID} videoState={videoState} setVideoState={setVideoState} videos={videos} setVideos={setVideos}/>} />

        <Route path="/auth/signup" element={<Signup/>}/>

        <Route path='/:id/new' element={<NewVideo videoState={videoState} setVideoState={setVideoState} userID={userID} searchBarState={searchBarState} setSearchBarState={setSearchBarState} onFinalSubmitHandler={onFinalSubmitHandler} finalVideoState={finalVideoState} setFinalVideoState={setFinalVideoState}/>} />

        <Route path='/:id/edit' element={<UpdateVideo />} />

        <Route path='/:vidId/delete' element={<DeleteVideo userID = {userID}/>} />

        <Route path="/auth/login" element={<Login loggedInState={loggedInState} onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler} usernameState={usernameState} passwordState={passwordState} setPasswordState={setPasswordState} setUsernameState={setUsernameState} setLoggedInState={setLoggedInState}/>} />

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
        <TopBar onChangeHandler={onChangeHandler} onSearchSubmitHandler={onSearchSubmitHandler} setSearchBarState={setSearchBarState} loggedInState={loggedInState} setLoggedInState={setLoggedInState} userID={userID} videos={videos} setVideos={setVideos}/>
        {routes}
      </main>
      
    </div>
  );
}

export default App;