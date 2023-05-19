import React, { useEffect, useState } from 'react';


function Login({loggedInState, onSubmitHandler, onChangeHandler, usernameState, passwordState, setUsernameState, setPasswordState, setLoggedInState}) {
    // const [usernameState, setUsernameState] = useState("");
    // const [passwordState, setPasswordState] = useState("");

    // const onChangeHandler = (e, setValue)=>{
    //     // console.log(e.target.value);
    //     setValue(e.target.value)
    // };

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
        // let localUser={
        //     username: storedUser.username,
        //     id: storedUser.id
        // }
        setLoggedInState(true)
        console.log(setLoggedInState)

    }
    }, [])

    // if(storedUser){
    //     console.log("localy stored user",storedUser)
    //     let localUser={
    //         username: storedUser.username,
    //         id: storedUser.id
    //     }
    //     setLoggedInState(localUser)
    // }

    if (loggedInState && storedUser){
        // let currentUser = JSON.parse(storedUser)
        // console.log(currentUser)
        console.log(storedUser)
        // {console.log("login state true")}
        return (
            <>
        <h1>You are logged in as {storedUser.username}</h1>
            <button>Logout</button>
            </>
        )
    }else{
    return (
        <div>
            {/* {console.log("user", loggedinState)} */}
            Login Here

            <form onSubmit={onSubmitHandler}>
                 <input type="email" placeholder="email" name="username" value={usernameState} onChange={(e)=> onChangeHandler(e, setUsernameState)}/>
                 <input type="password" placeholder="password" name="password" value={passwordState} onChange={(e)=> onChangeHandler(e, setPasswordState)}/>
                <input type="submit" value="Login"/>
             </form>
        </div>
    );
}
}

export default Login;
