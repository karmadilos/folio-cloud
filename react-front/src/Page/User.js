import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

export function User() {
    const history = useHistory();
    const params = useParams();
    console.log(params);

    const [user,setUser]= useState(null);

    useEffect(() => {
        if(localStorage.getItem("token")){
            const server = async () =>{
            };
            server();
        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[]);

    return (
        <div>
            
        </div>
    )
}
