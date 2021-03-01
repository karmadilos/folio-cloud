import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import { Awards } from "../component/User_detail/Awards/Awards";
import { Certificates } from "../component/User_detail/Certificates/Certificates";
import { Educations } from "../component/User_detail/Education/Educations";
import { Profile } from "../component/User_detail/Profile/Profile";
import { Projects } from "../component/User_detail/Projects/Projects";
import * as api from "../Api/Api";
export function User() {
    const [educations, setEducations] = useState([]);
    const [user, setUser] = useState([]);
    const [awards, setAwards] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            const server = async () => {
                let k = "education"
                setEducations(await api.readInfo(k)); 
                k = "user"
                setUser(await api.readInfo(k)); 
                k = "awards"
                setAwards(await api.readInfo(k)); 
                k = "certificates"
                setCertificates(await api.readInfo(k)); 
                k = "project"
                setProjects(await api.readInfo(k)); 
            }
            server();
            console.log(user);
        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[]);

    return (
        <Container>
            <Row>
                <Col sm={3}>
                  <Profile info={user} isState/>
                </Col>
                <Col sm={8}>
                    <Educations info={educations} isState/>
                    <Awards info={awards} isState/>
                    <Certificates info={certificates} isState/>       
                    <Projects info={projects} isState/>
                </Col>
            </Row>
        </Container>
    )
}
