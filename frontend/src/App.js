import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Videos from './pages/Videos';
import NewVideo from './pages/NewVideo';
import UpdateVideo from './pages/UpdateVideo';
import Navbar from './components/Navbar';
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

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
  setLoggedInState(loggedInUser);
  // store loged in user in the browser so that component rendering does not reset it, 
  window.localStorage.setItem("user", JSON.stringify(loggedInUser));
  console.log("logged In User", loggedInUser);
  console.log("end submit handler")

}


//---------end of loggedInState


  routes = (
    <>

      {/* should the Navbar be here or in the return inside the main element but above the routes? */}
      <Navbar />

      <Routes>

        <Route exact={true} path='/' element={<Videos />} />

        <Route path='/new' element={<NewVideo />} />

        <Route path='/:id/edit' element={<UpdateVideo />} />

        <Route path="/auth/signup" element={<Signup/>} />

        <Route path="/auth/login" element={<Login loggedInState={loggedInState} onSubmitHandler={onSubmithandler} onChangeHandler={onChangeHandler} usernameState={usernameState} passwordState={passwordState} setPasswordState={setPasswordState} setUsernameState={setUsernameState} setLoggedInState={setLoggedInState}/>} />

        {/* fallback/catch-all route */}
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </>
  )

  return (
    <div className="App">

      <header>
        <h1>Header</h1>
      </header>

      <main>
        {routes}
      </main>
      
    </div>
  );
}

export default App;