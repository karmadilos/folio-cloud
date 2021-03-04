import React, { useEffect } from "react";
import {Form, Button,} from 'react-bootstrap';
export function EducationWrite({mode, PostEdu, UpdateEdu, education, setMode, setInputs,ChangeInput}) {
    function Submit(){
        if (mode == "update"){
            UpdateEdu()
        }
        else{
            PostEdu()
        }
    }

    return (
        <Form onSubmit={() => Submit} >
            <Form.Group controlId="formBasicName">
                <Form.Control name="s_name" type="text" placeholder="학교 이름" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control name="major" type="text" placeholder="전공" onChange={ChangeInput}/>
            </Form.Group>
            <div className="mb-3">
                <Form.Check
                type="radio"
                label="재학 중"
                value="재학 중"
                name="state"
                id="state"
                onChange={ChangeInput}
                />
                <Form.Check
                type="radio"
                label="학사 졸업"
                value="학사 졸업"
                name="state"
                id="state"
                onChange={ChangeInput}/>
                <Form.Check
                type="radio"
                label="석사 졸업"
                value="석사 졸업"
                name="state"
                id="state"
                onChange={ChangeInput}/>
                <Form.Check
                type="radio"
                label="박사 졸업"
                value="박사 졸업"
                name="state"
                id="state"
                onChange={ChangeInput}/>
            </div>
            <Button variant="primary" type="submit" >
                확인
            </Button>
            <Button onClick={()=>setMode("")}  variant="primary" >
                취소
            </Button>
        </Form>
    );
}