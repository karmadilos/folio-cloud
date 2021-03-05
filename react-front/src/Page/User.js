import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Awards } from "../component/User_detail/Awards/Awards";
import { Certificates } from "../component/User_detail/Certificates/Certificates";

import { Profile } from "../component/User_detail/Profile/Profile";
import { Projects } from "../component/User_detail/Projects/Projects";
import * as api from "../Api/Api";
import { Educations } from "../component/User_detail/Education/Educations";
export function User() {
    const [user, setUser] = useState([]);
    const history = useHistory();
    const category = 'users';

    useEffect(() => {
        if(localStorage.getItem('token')){
            const server = async () => {
                setUser(await api.readInfo(category));
            }
            server();
        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[]);
    const current_user = localStorage.getItem("user_id");
    return (
        <Container fluid>
            <Row className="justify-content-md-center p-5">
                <Col sm="3">
                    {/* <Profile user_id={user.id} isState/> */}
                </Col>
                <Col sm="8">
                    <Educations isState={user.id == current_user}/>
                    {/* <Awards awards={awards} isState/> */}
                    <Certificates isState={user.id == current_user}/>       
                    {/* <Projects projects={projects} isState/> */}
                </Col>
            </Row>
        </Container>
    )
}
