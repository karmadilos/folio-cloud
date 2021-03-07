import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Signup.css'
import * as api from '../Api/Api'
export function Signup(){
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email : "",
        password : "",
        c_password : "",
        name : "",
    });
    const [error, setError] = useState(false);
    const [p_error, setP_error] = useState(false);
    const [c_error, setC_error] = useState(false);

    const ChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    async function signup(e){
        e.preventDefault();
        api.Signup(inputs);
        history.push('/')
    }
    function isEmail(email) {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(email); 
    }
    function isPassword(password) {
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; 
        return regExp.test(password); 
    }
    useEffect(() => {
        const email = inputs.email;
        if(isEmail(email)){
            setError(false);
        }else{
            setError(true);
        }
        console.log(email);
        console.log(error);
    },[inputs])
    useEffect(() => {
        const password = inputs.password;
        if(isPassword(password)){
            setP_error(false);
        }else{
            setP_error(true);
        }
    },[inputs])
    useEffect(() => {
        const password = inputs.password;
        const c_password = inputs.c_password;
        if(password == c_password){
            setC_error(true);
        }else{
            setC_error(false);
        }
    },[inputs])
    return(
    <Container className="p-5">
        <Row className="justify-content-md-center">
            <Col>
                <Form onSubmit={signup}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="email" onChange={ChangeInput}/>
                        {error &&<Form.Text warning>Check your email.</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={ChangeInput}/>
                        {p_error &&<Form.Text warning> 8 ~ 10자 영문,숫자 조합</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="c_password" type="password" placeholder="Password" onChange={ChangeInput}/>
                        {!c_error &&<Form.Text muted>Check your password.</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Name" onChange={ChangeInput}/>
                    </Form.Group>
                    <Form.Row className="justify-content-md-center">
                        <Button variant="primary" type="submit" disabled={!c_error}>
                            회원가입
                        </Button>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
    </Container>
    );
}
