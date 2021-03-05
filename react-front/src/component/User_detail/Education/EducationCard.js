import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function EducationCard({category, setMode, education, isState, setInputs}){
    return<Row className="p-2">
            <Col>
                {education.s_name}<br/>
                <span className="text-muted">{education.major} ({education.state})</span>
            </Col>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="link" onClick={() => {setMode("update"); setInputs({
                    id : education['id'],
                    s_name : education['s_name'],
                    major : education['major'],
                    state : education['state'],             
                });}}>Edit </Button>
                <Button variant="link" onClick={() => api.deleteInfo(category,education)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Row>
}