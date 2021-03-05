import React from "react";
import {Form, Button,} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function CertificateWrite({mode,inputs, PostData, UpdateData, setMode, ChangeInput, setStartdate, startdate}) {
    return (
        <Form className="justify-content-md-center p-3" onSubmit={(e) => {e.preventDefault(); mode =="update" ? UpdateData() : PostData()} } >
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs.c_name} name="c_name" type="text" placeholder="자격증" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control value={inputs.c_agency} name="c_agency" type="text" placeholder="자격증 내용" onChange={ChangeInput}/>
            </Form.Group>
            <DatePicker
                withPortal
                className="date date-record"
                placeholder="취득 날짜"
                dateFormat="yyyy-MM-dd"
                selected={startdate}
                onChange={date => setStartdate(date)}
                />
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