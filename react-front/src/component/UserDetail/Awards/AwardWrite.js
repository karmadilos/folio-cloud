import React from "react";
import {Form, Button} from 'react-bootstrap';
export function AwardWrite({mode,error, PostData, UpdateData, inputs, setMode, ChangeInput}) {
    return (
        <Form className="justify-content-md-center p-3" onSubmit={(e) => {e.preventDefault(); mode =="update" ? UpdateData() : PostData()} } >
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs.a_name} name="a_name" type="text" placeholder="수상 이름" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicA_description">
                <Form.Control value={inputs.a_description} name="a_description" type="text" placeholder="수상 내용" onChange={ChangeInput}/>
            </Form.Group>
            {!error &&<Form.Text style={{ color : "red"}}>수상 이름은 필수 입니다.</Form.Text>}
            <div className="justify-content-md-center">
                <Button disabled={!error} className="mx-1 my-3" variant="primary" type="submit" >
                    확인
                </Button>
                <Button onClick={()=>setMode("")}  variant="primary" >
                    취소
                </Button>
            </div>
        </Form>
    );
}