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
        <>
        <div className='login'>
            {/* {console.log("user", loggedinState)} */}
            Login Here

            <form onSubmit={onSubmitHandler}>
                 <input type="email" placeholder="email" name="username" value={usernameState} onChange={(e)=> onChangeHandler(e, setUsernameState)}/>
                 <input type="password" placeholder="password" name="password" value={passwordState} onChange={(e)=> onChangeHandler(e, setPasswordState)}/>
                <input type="submit" value="Submit
                "/>
             </form>
        </div>
        <NavLink to={"/auth/signup"}>
        <button>Create Account</button>
        </NavLink>
        </>
    );
}
}

export default Login;
