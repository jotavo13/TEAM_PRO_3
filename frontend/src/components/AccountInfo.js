import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AccountInfo({loggedInState, setLoggedInState}) {
    // console.log("logged in state: ",loggedInState)
    const Navigate = useNavigate();

        const logout = ()=>{
            localStorage.removeItem("user");
            setLoggedInState(false);
            Navigate("/auth/login")
         
        }

        const loginButton = ()=>{
            Navigate("/auth/login")
        }

        if (!loggedInState) {
             return(  <button onClick={loginButton}>Login</button>)
        }
       
        if(loggedInState){
            return(<button onClick={logout}>Logout</button>)
        }
}


export default AccountInfo;
