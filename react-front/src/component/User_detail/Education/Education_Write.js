import React, { useState } from "react";
import {Form, Button, Row, Col, FormText} from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function Education_Write(props) {
    const [inputs, setInputs] = useState({
        s_name : "",
        major : "",
        state : "",
        post_id : 1,
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const addForm = (e) => {
        e.preventDefault();
        setInputs({post_id : post_id+1})
        const k = "education"
        api.addInfo(k,inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="s_name" type="text" placeholder="학교 이름" onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="major" type="text" placeholder="전공" onChange={onChangeInput}/>
            </Form.Group>
            <div className="mb-3">
                <Form.Check
                type="radio"
                label="재학 중"
                value="재학 중"
                name="state"
                id="state"
                onChange={onChangeInput}
                />
                <Form.Check
                type="radio"
                label="학사 졸업"
                value="학사 졸업"
                name="state"
                id="state"
                onChange={onChangeInput}/>
                <Form.Check
                type="radio"
                label="석사 졸업"
                value="석사 졸업"
                name="state"
                id="state"
                onChange={onChangeInput}/>
                <Form.Check
                type="radio"
                label="박사 졸업"
                value="박사 졸업"
                name="state"
                id="state"
                onChange={onChangeInput}/>
            </div>
            <Button variant="primary" type="submit" >
                확인
            </Button>
            <Button variant="primary" >
                취소
            </Button>
        </Form>
    );
}