import React, { useState, useEffect } from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import {ProfileCardWrite} from './ProfileCardWrite';
import * as api from '../../../Api/Api'
import { useHistory, useParams } from "react-router-dom";
export function ProfileCard({isState, category, id}){
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState([]);
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
    useEffect(() => {
        if(localStorage.getItem('token')){
            const server = async () => {
                setUser(await api.readInfo(category,params.id));
            }
            server();
        }
        else{
            alert("로그인이 필요한 서비스입니다!");
            history.push('/');
        }
    },[mode]);
    const url = "https://picsum.photos/id/"+params.id+"/1000/1000/"
    return<Card  className="mb-2" style={{boxShadow : "4px 2px 10px rgba(136, 165, 191, 0.48), -4px -2px 10px #FFFFFF"}} >
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img className="mx-auto mb-3" style={{width : '100px'}} src={url}/> 
                </Row>
                <Card.Title className="h5">{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted h6">{user.email}</Card.Subtitle>
                <Card.Text>{user.intro}</Card.Text>            
                <Row className="justify-content-md-center">
                    {isState &&<Button variant="link" onClick={() => {setMode("edit"); setInputs({
                    id: id,
                    name : user['name'],
                    email : user['email'],
                    intro : user['intro']            
                });}}>Edit </Button>}
                </Row>
            </Card.Body>
            {mode === "edit" && <ProfileCardWrite UpdateDate={UpdateDate} inputs={inputs} setMode={setMode} ChangeInput={ChangeInput}/>}
        </Card>
}