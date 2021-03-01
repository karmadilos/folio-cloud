import React from 'react';
import { Card } from 'react-bootstrap';
import img from '../../../img/img.jpg';
export function Profile_Card(props){
    const url = "https://picsum.photos/id/"+props.info.info[0]+37+"/1000/1000/"
    console.log(props.info);
    return<Card border="light">
            <Card.Img style={{width : '100px'}} variant="top"  src={url} roundedCircle/> 
            <Card.Body>
                <Card.Text>이메일 : {props.info.info[1]}</Card.Text>
                <Card.Text>이름 : {props.info.info[3]}</Card.Text>
            </Card.Body>
        </Card>
}