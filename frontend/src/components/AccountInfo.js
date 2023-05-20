import { useNavigate } from "react-router-dom";

function AccountInfo() {
    
    const Navigate = useNavigate();

        const logout = ()=>{
            console.log("logout button pressed")
            localStorage.removeItem("user");
            Navigate("/")
        }

    return(
        <>
        <button>Login</button>
        <button onClick={logout}>Logout</button>
        </>
    )
}


export default AccountInfo;
