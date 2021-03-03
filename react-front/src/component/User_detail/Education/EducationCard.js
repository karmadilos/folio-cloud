import React from 'react';
import { Card } from 'react-bootstrap';

export function EducationCard(props){
    return<Card border="light">
            <Card.Body>
                <Card.Text>{props.name}</Card.Text>
                <Card.Text>{props.major} ({props.state})</Card.Text>
            </Card.Body>
        </Card>
}