import React, { useEffect, useState } from 'react';
import "./Login.css"
import { NavLink } from 'react-router-dom';


function Login({loggedInState, onSubmitHandler, onChangeHandler, usernameState, passwordState, setUsernameState, setPasswordState, setLoggedInState}) {

    const [storedUser, setStoredUser] = useState(null);
    useEffect(()=>{
        // storedUser = window.localStorage.getItem("user");
        const localStoredUser = localStorage.getItem('user');
        console.log(localStoredUser)
         if(localStoredUser){
            let parsedUser = JSON.parse(localStoredUser)
            console.log("parsed", parsedUser)
            setStoredUser(parsedUser)
        console.log("localy stored user is", localStoredUser)
        setLoggedInState(true)
        console.log(setLoggedInState)

    }
    }, [])


    if (loggedInState && storedUser){
        // let currentUser = JSON.parse(storedUser)
        // console.log(currentUser)
        console.log(storedUser)
        // {console.log("login state true")}
        return (
            <>
        <h1>You are logged in as {storedUser.username}</h1>
            </>
        )
    }else{
    return (
        <div className='surround'>
        <div className='login'>
            {/* {console.log("user", loggedinState)} */}
            

            <form onSubmit={onSubmitHandler}>
                Login Here
                 <input type="email form-control" placeholder="email" name="username" value={usernameState} onChange={(e)=> onChangeHandler(e, setUsernameState)} className='email input'/>
                 <br/>
                 <input type="password" placeholder="password" name="password" value={passwordState} onChange={(e)=> onChangeHandler(e, setPasswordState)} className='password input'/>
                <input type="submit" value="Submit
                " className='submit'/>
             </form>
        </div>
        </div>
    );
}
}

export default Login;
