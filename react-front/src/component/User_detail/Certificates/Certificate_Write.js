import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function Certificate_Write(props) {
    const [inputs, setInputs] = useState({
        c_name : "",
        c_agency : "",
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    const addForm = (e) => {
        e.preventDefault();
        const k = "certificates"
        api.addInfo(k,inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="c_name" type="text" placeholder="자격증 이름" onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="c_agency" type="text" placeholder="자격증 인증기관 " onChange={onChangeInput}/>
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