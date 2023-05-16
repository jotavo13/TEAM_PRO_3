import React, { useState } from 'react';


function Login(props) {
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    const onChangeHandler = (e, setValue)=>{
        // console.log(e.target.value);
        setValue(e.target.value)
    };

    const onSubmithandler = async () => {
        const username = usernameState;
        const password = passwordState;

        let userAttempt = {
            username: username,
            password: password
        }
        let userExists;

        const options = {
			method: "POST", 
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userAttempt)
		}       
        
        const responseData = await fetch("http://localhost:3000/auth/login", options)

        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            Login Here
            <form onSubmit={onSubmithandler}>
                 <input type="email" placeholder="email" name="username" value={usernameState} onChange={(e)=> onChangeHandler(e, setUsernameState)}/>
                 <input type="password" placeholder="password" name="password" value={passwordState} onChange={(e)=> onChangeHandler(e, setPasswordState)}/>
                <input type="submit" value="Login"/>
             </form>
        </div>
    );
}

export default Login;