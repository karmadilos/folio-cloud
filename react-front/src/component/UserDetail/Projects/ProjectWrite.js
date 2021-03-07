import React from "react";
import {Form, Button,} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function ProjectWrite({mode, error, inputs, PostData, UpdateData, setMode, ChangeInput, setStartdate, startdate,enddate,setEnddate}) {
    console.log(inputs);
    return (
        <Form className="justify-content-md-center p-3" onSubmit={(e) => {e.preventDefault(); mode =="update" ? UpdateData() : PostData()} } >
            <Form.Group controlId="formBasicName">
                <Form.Control value={inputs && inputs.p_name} name="p_name" type="text" placeholder="프로젝트 이름" onChange={ChangeInput}/>
            </Form.Group>
            <Form.Group controlId="formBasicMajor">
                <Form.Control value={inputs && inputs.p_description} name="p_description" type="text" placeholder="프로젝트 내용" onChange={ChangeInput}/>
            </Form.Group>
            <DatePicker
                withPortal
                className="date date-record"
                selected={startdate}
                onChange={date => setStartdate(date)}
                />
            <DatePicker
                withPortal
                className="date date-record"
                minDate={startdate}
                selected={enddate}
                onChange={date => setEnddate(date)}
                />
                {!error &&<Form.Text style={{ color : "red"}}>프로젝트 이름은 필수 입니다.</Form.Text>}
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