import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Awards } from "../component/User_detail/Awards";
import { Certificates } from "../component/User_detail/Certificates";
import { Educations } from "../component/User_detail/Education.js/Educations";
import { Profile } from "../component/User_detail/Profile/Profile";
import { Projects } from "../component/User_detail/Projects";
import * as api from "../Api/Api";
export function User() {
    const [educations, setEducations] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            const server = async () => {
                setEducations(await api.readEducation());
            }
            server();
        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[]);

    return (
        <div>
            {/* <Profile/> */}
            <Educations info={educations}/>
            <Projects/>
            <Awards/>
            <Certificates/>
        </div>
    )
}
