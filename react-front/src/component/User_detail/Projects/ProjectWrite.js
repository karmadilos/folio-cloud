import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function ProjectWrite(props) {
    const [inputs, setInputs] = useState({
        p_name : "",
        p_description : "",
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    const addForm = (e) => {
        e.preventDefault();
        const k ="project"
        api.addInfo(k,inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="p_name" type="text" placeholder="프로젝트 이름" onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="p_description" type="text" placeholder="프로젝트 소개" onChange={onChangeInput}/>
            </Form.Group>
            <Button variant="primary" type="submit" >
                확인
            </Button>
            <Button variant="primary" >
                취소
            </Button>
        </Form>
    );
}