import React from 'react';
import { useHistory } from 'react-router';
import { Card, Row } from 'react-bootstrap';
export function UserCard({user}){
    const url = "https://picsum.photos/id/"+user.id+"/1000/1000/"
    const current_user = localStorage.getItem("user_id");
    const history = useHistory();
    return<Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img className="mx-auto mb-3" style={{width : '150px'}} src={url}/> 
                </Row>
                <Card.Title className="h5">{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted h6">{user.email}</Card.Subtitle>
                <Card.Text>{user.intro}</Card.Text>            
                <Row className="justify-content-md-center">
                    { current_user && <Card.Link href="" onClick={() => history.push(`/user/${user.id}`)}>Show User</Card.Link>}
                </Row>
        </Card.Body>
}