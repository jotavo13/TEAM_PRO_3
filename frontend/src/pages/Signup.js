import { useState} from "react";
import bcrypt from "bcryptjs";
import "./Signup.css"
import { useNavigate } from "react-router-dom";



function NewUser() {
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    const navigate = useNavigate();

    const onSubmithandler = async (e)=>{
        e.preventDefault();
        const username = usernameState;
        const password = passwordState;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username: username,
            password: hashedPassword
        }
        console.log(newUser)

        const options = {
			method: "POST", 
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		}       

        const responseData = await fetch("http://localhost:4000/auth/signup", options)

        navigate('/auth/login');

    }



const onChangeHandler = (e, setValue)=>{
    // console.log(e.target.value);
    setValue(e.target.value)
};


return(
    <div className="signup">
        Create an account:
    <form onSubmit={onSubmithandler}>
        <input type="email" placeholder="email" name="username" value={usernameState} onChange={(e)=> onChangeHandler(e, setUsernameState)}/>
        <input type="password" placeholder="password" name="password" value={passwordState} onChange={(e)=> onChangeHandler(e, setPasswordState)}/>

        <input type="submit" value="Signup"/>

    </form>
    </div>
)
}

export default NewUser;