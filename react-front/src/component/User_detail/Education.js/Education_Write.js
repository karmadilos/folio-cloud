import React, { useState } from "react";
import {Form, Button,InputGroup,FormControl} from 'react-bootstrap';
export function Education_Write(props) {
    const [inputs, setInputs] = useState({
        s_name : "",
        major : "",
        state : 0,
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };


    const addForm = () => {
        props.addEducation(inputs);
    };

    return (
        <Form onSubmit={addForm}>
            <Form.Group controlId="formBasicName">
                <Form.Control name="s_name" type="text" placeholder="학교 이름" />
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="major" type="text" placeholder="전공" />
            </Form.Group>
            <InputGroup>
                <InputGroup.Radio aria-label="Radio button for following text input" />
                <InputGroup.Radio aria-label="Radio button for following text input" />
                <InputGroup.Radio aria-label="Radio button for following text input" />
                <InputGroup.Radio aria-label="Radio button for following text input" />
            </InputGroup>
            <Button variant="primary" type="submit">
                확인
            </Button>
            <Button variant="primary">
                취소
            </Button>
        </Form>
    );
}