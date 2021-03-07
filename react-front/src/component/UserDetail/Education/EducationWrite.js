import React from "react";
import {Form, Button} from 'react-bootstrap';
export function EducationWrite({mode, PostData, UpdateData, inputs, setMode, ChangeInput, error}) {
    console.log(inputs.state);
    return (
        <Form className="justify-content-md-center p-3" onSubmit={(e) => {e.preventDefault(); mode =="update" ? UpdateData() : PostData()} } >
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs.s_name} name="s_name" type="text" placeholder="학교 이름" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control value={inputs.major} name="major" type="text" placeholder="전공" onChange={ChangeInput}/>
            </Form.Group>
            <div className="mb-3">
                <Form.Check
                inline
                type="radio"
                label="재학 중"
                value="재학 중"
                name="state"
                id="state"
                checked={inputs.state === "재학 중"}
                onChange={ChangeInput}
                />
                <Form.Check
                inline
                type="radio"
                label="학사 졸업"
                value="학사 졸업"
                name="state"
                id="state"
                checked={inputs.state === "학사 졸업"}
                onChange={ChangeInput}/>
                <Form.Check
                inline
                type="radio"
                label="석사 졸업"
                value="석사 졸업"
                name="state"
                id="state"
                checked={inputs.state === "석사 졸업"}
                onChange={ChangeInput}/>
                <Form.Check
                inline
                type="radio"
                label="박사 졸업"
                value="박사 졸업"
                name="state"
                id="state"
                checked={inputs.state === "박사 졸업"}
                onChange={ChangeInput}/>
                {!error &&<Form.Text style={{ color : "red"}}>학교 이름은 필수 입니다.</Form.Text>}
            </div>
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