import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function Education_Write(props) {
    const [inputs, setInputs] = useState({
        s_name : "",
        major : "",
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    const addForm = (e) => {
        e.preventDefault();
        api.addEducation(inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="s_name" type="text" placeholder="학교 이름" onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="major" type="text" placeholder="전공" onChange={onChangeInput}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                확인
            </Button>
            <Button variant="primary">
                취소
            </Button>
        </Form>
    );
}