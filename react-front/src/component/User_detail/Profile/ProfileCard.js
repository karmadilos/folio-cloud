import React, { useState } from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import {ProfileCardWrite} from './ProfileCardWrite';
import * as api from '../../../Api/Api'
import { useHistory } from 'react-router';
export function ProfileCard({user, isState, category, id}){
    const history =useHistory();
    const [mode, setMode] =useState("");
    const [inputs, setInputs] =useState({
        id : "",
        name : "",
        email : "",
        intro : "",
    });
    console.log(inputs);
    const ChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const UpdateDate = (e) =>{
        e.preventDefault();
        console.log(inputs);
        api.fixUser(category,inputs);
        setInputs({
            name : "",
            email : "",
            intro :"",             
        });
        setMode("");
    }
    const url = "https://picsum.photos/id/"+0+"/1000/1000/"
    return<Card className="mb-2" >
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img className="mx-auto mb-3" style={{width : '100px'}} src={url}/> 
                </Row>
                <Card.Title className="h5">{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted h6">{user.email}</Card.Subtitle>
                <Card.Text>{user.intro}</Card.Text>            
                <Row className="justify-content-md-center">
                    {isState ?<Button variant="link" onClick={() => {setMode("edit"); setInputs({
                    id: id,
                    name : user['name'],
                    email : user['email'],
                    intro : user['intro']            
                });}}>Edit </Button>:<Card.Link href="" onClick={() => history.push(`/user/${user.id}`)}>Show User</Card.Link>}
                </Row>
            </Card.Body>
            {mode === "edit" && <ProfileCardWrite UpdateDate={UpdateDate} inputs={inputs} setMode={setMode} ChangeInput={ChangeInput}/>}
        </Card>
}