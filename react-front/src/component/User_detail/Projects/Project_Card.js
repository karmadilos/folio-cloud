import React from 'react';
import { Card } from 'react-bootstrap';

export function Project_Card(props){
    return<Card border="light">
            <Card.Body>
                <Card.Text>{props.name}</Card.Text>
                <Card.Text>{props.major}</Card.Text>
            </Card.Body>
        </Card>
}