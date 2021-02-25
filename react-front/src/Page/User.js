import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Awards } from "../component/User_detail/Awards";
import { Certificates } from "../component/User_detail/Certificates";
import { Educations } from "../component/User_detail/Educations";
import { Profile } from "../component/User_detail/Profile";
import { Projects } from "../component/User_detail/Projects";

export function User() {
    const history = useHistory();
    const params = useParams();
    console.log("123");
    console.log(localStorage.getItem('token'));
    const [user,setUser]= useState(null);

    useEffect(() => {
        if(localStorage.getItem('token')){

        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[history]);

    return (
        <div>
            <Profile/>
            <Educations/>
            <Projects/>
            <Awards/>
            <Certificates/>
        </div>
    )
}
