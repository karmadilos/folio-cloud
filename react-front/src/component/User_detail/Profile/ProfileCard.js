import React from 'react';
import { Card } from 'react-bootstrap';
export function ProfileCard(props){
    
    const url = "https://picsum.photos/id/"+props.info.info[0]+"/1000/1000/"

    return<Card className="m-1">
            <Card.Img style={{width : '100px'}} variant="top"  src={url} className="justify-content-center"/> 
            <Card.Body>
                <Card.Text>이메일 : {props.info.info[1]}</Card.Text>
                <Card.Text>이름 : {props.info.info[3]}</Card.Text>
            </Card.Body>
        </Card>
}