import React, {useState} from 'react';
import {useHistory} from "react-router";
import * as api from '../Api/Api'
import './Login.css';
import { Card, Form, Button } from 'react-bootstrap';

export function Login(){
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    };

    function login(e){
        e.preventDefault();
        const res = api.Login(inputs);
        console.log(res);
    }
    return<>
        <Card className="p-2">
            <h5>Login</h5>
            <Form className="justify-content-md-center p-3" onSubmit={login} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Control name="email" type="email" placeholder="email" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
                </Form.Group>
                <Button className="my-1" size="sm" variant="outline-info" type="submit" >
                    로그인
                </Button>
                <Button className="mx-2" size="sm" variant="outline-secondary" onClick={() => history.push(`/signup`)}>
                    회원가입
                </Button>
            </Form>
        </Card>
    </>
}
