import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function AwardWrite(props) {
    const [inputs, setInputs] = useState({
        a_name : "",
        a_description : "",
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    const addForm = (e) => {
        e.preventDefault();
        const k = "awards"
        api.addInfo(k,inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="a_name" type="text" placeholder="수상 이름" onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="a_description" type="text" placeholder="수상 내용" onChange={onChangeInput}/>
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