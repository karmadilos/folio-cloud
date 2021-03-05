import React from "react";
import {Form, Button,} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function CertificateWrite({mode, PostData, UpdateData, inputs, setMode, ChangeInput,setInputs,dateToString}) {
    return (
        <Form onSubmit={(e) => {e.preventDefault(); mode =="update" ? UpdateData() : PostData()} } >
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs.s_name} name="s_name" type="text" placeholder="자격증" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control value={inputs.major} name="major" type="text" placeholder="자격증 내용" onChange={ChangeInput}/>
            </Form.Group>
            <DatePicker
                withPortal
                className="date date-record"
                placeholder="취득 날짜"
                selected={inputs.issue_date}
                onChange={date => setInputs("issue_data",date)}
                />
            <Button variant="primary" type="submit" >
                확인
            </Button>
            <Button onClick={()=>setMode("")}  variant="primary" >
                취소
            </Button>
        </Form>
    );
}