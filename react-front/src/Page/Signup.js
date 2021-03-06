import React, {useState} from 'react';
import {useHistory} from "react-router";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Signup.css'
import * as api from '../Api/Api'
export function Signup(){
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        c_password: '',
        name: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    };

    async function signup(e){
        e.preventDefault();
        api.Signup(inputs);
        history.push('/')
    }



    return(
    <Container className="p-5">
        <Row className="justify-content-md-center">
            <Col>
                <Form onSubmit={signup}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" onChange={handleChange}/>
                        {<Form.Text muted>Check your email.</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                        {<Form.Text muted>Check your password.</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Row className="justify-content-md-center">
                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
    </Container>
    );
}
