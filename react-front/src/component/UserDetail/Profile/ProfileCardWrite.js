import React from "react";
import {Form, Button} from 'react-bootstrap';

export function ProfileCardWrite({inputs,setMode,ChangeInput,UpdateDate}) {
    return (
        <Form className="justify-content-md-center p-3" onSubmit={UpdateDate}>
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs.name} name="name" type="text" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Control value={inputs.email} name="email" type="email" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicIntro">
            <Form.Control value={inputs.intro} name="intro" type="text" placeholder="한줄 소개를 적어 주세요!" onChange={ChangeInput}/>
            </Form.Group>
            <div className="justify-content-md-center">
                <Button className="mx-1 my-3" variant="primary" type="submit" >
                    확인
                </Button>
                <Button onClick={()=>setMode("")}  variant="primary" >
                    취소
                </Button>
            </div>
        </Form>
    );
}