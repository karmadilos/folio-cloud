import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import * as api from '../../../Api/Api'
export function ProjectCard({category, setMode, project, isState, setInputs, setEnddate, setStartdate}){
    return<Row className="p-2">
            <Col>
                {project['p_name']}<br/>
                <span className="text-muted">{project['p_description']}</span><br/>
                <span className="text-muted">{project['start_date']} ~ {project['end_date']}</span>
            </Col>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="link" onClick={() => {setMode("update"); setInputs({
                    id : project['id'],
                    p_name : project['p_name'],
                    p_description : project['p_description'],
                });
                setStartdate(new Date(project['start_date']));
                setEnddate(new Date(project['end_date']));
                }}>Edit </Button>
                <Button variant="link" onClick={() => {api.deleteInfo(category,project); setMode("delete")}} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Row>
}