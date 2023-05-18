import React, { useEffect, useState } from 'react';


function Login({loggedInState, onSubmitHandler, onChangeHandler, usernameState, passwordState, setUsernameState, setPasswordState, setLoggedInState}) {
    // const [usernameState, setUsernameState] = useState("");
    // const [passwordState, setPasswordState] = useState("");

    // const onChangeHandler = (e, setValue)=>{
    //     // console.log(e.target.value);
    //     setValue(e.target.value)
    // };

    let storedUser;
    useEffect(()=>{
        storedUser = window.localStorage.getItem("user");
         if(storedUser){
        console.log("localy stored user",storedUser)
        let localUser={
            username: storedUser.username,
            id: storedUser.id
        }
        setLoggedInState(localUser)
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

    if (loggedInState){
        // {console.log("login state true")}
        return <h1>You are logged in as {}</h1>
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