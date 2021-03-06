import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import { Awards } from "../component/UserDetail/Awards/Awards";
import { Certificates } from "../component/UserDetail/Certificates/Certificates";
import { ProfileCard } from "../component/UserDetail/Profile/ProfileCard";
import { Projects } from "../component/UserDetail/Projects/Projects";
import { Educations } from "../component/UserDetail/Education/Educations";
export function User() {
    const params = useParams();
    const history = useHistory();
    const category = 'users';
    const current_user = localStorage.getItem("user_id");

    useEffect(() => {       
        if(!localStorage.getItem("token")){
            history.push("/login");
            return;
        }
    },[]);

    return (
        <Container fluid>
            <Row className="justify-content-md-center p-5">
                <Col sm="4">
                    <ProfileCard id={params.id} category={category} isState={params.id == current_user}/>
                </Col>
                <Col sm="8">
                    <Educations id={params.id} isState={params.id == current_user}/>
                    <Awards id={params.id} isState={params.id == current_user}/>
                    <Certificates id={params.id} isState={params.id == current_user}/>       
                    <Projects id={params.id} isState={params.id == current_user}/>
                </Col>
            </Row>
        </Container>
    )
}
