import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountInfo.css"


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

        const createAccount = () =>{
            Navigate("/auth/signup")
        }

        if (!loggedInState) {
             return(  
             <>
             <button onClick={loginButton}>Login</button>
             <button onClick={createAccount}>New Account</button>
             </>)
        }
       
        if(loggedInState){

            return(<button onClick={logout}>Logout</button>)
        }
}


export default AccountInfo;
