import React from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';



function DeleteVideo({userID}) {

    const URL = 'http://localhost:4000'   
    const vidId = useParams();
    console.log(vidId);
    const navigate = useNavigate();

    const deleteHandler = async (e) =>{
        e.preventDefault();
        console.log("confirmed delete")
        const response = await fetch(URL + `/${vidId.vidId}` + "/delete", {
            method: "delete"
        })
        console.log("response", response);
        
        navigate(`/${userID}`);
    }
   
    const cancelHandler = () => {
        navigate(`/${userID}`);
    }

    return (
        <div className="deletepage" style={{color: "white"}}>
          Are you sure you want to delete this video? 
          <button onClick = {deleteHandler}>Confirm</button>
          <button onClick = {cancelHandler} >Cancel</button>
        </div>
    );
}

export default DeleteVideo;