import React from 'react';
import * as api from '../../../Api/Api'
import { Row, Col, Button } from 'react-bootstrap';
export function CertificateCard({certificate, setMode, category, isState, setInputs,setStartdate}){
    return<Row className="p-2">
            <Col>
                {certificate['c_name']}<br/>
                <span className="text-muted">{certificate['c_agency']}</span><br/>
                <span className="text-muted">{certificate['issue_date']}</span>
            </Col>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="link" onClick={() => {setMode("update"); setInputs({
                    id : certificate['id'],
                    c_name : certificate['c_name'],
                    c_agency : certificate['c_agency'],
                });
                setStartdate(new Date(certificate['issue_date']));
                }}>Edit </Button>
                <Button variant="link" onClick={() => {api.deleteInfo(category,certificate); setMode("delete")}} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Row>
}