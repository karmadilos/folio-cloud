import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import * as api from '../../../Api/Api'
export function AwardCard({category, setMode, award, isState, setInputs}){
    return<Row className="p-2">
            <Col>
                {award.a_name}<br/>
                <span className="text-muted">{award.a_description}</span>
            </Col>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="link" onClick={() => {setMode("update"); setInputs({
                    id : award['id'],
                    s_name : award['s_name'],
                    major : award['major'],
                    state : award['state'],             
                });}}>Edit </Button>
                <Button variant="link" onClick={() => api.deleteInfo(category,award)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Row>
}