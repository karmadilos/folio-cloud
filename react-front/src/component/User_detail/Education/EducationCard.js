import React from 'react';
import { Card } from 'react-bootstrap';
export function EducationCard({education}){
    return<Card>
            <Card.Body>
                <Card.Text>{education.s_name}</Card.Text>
                <Card.Text>{education.major} ({education.state})</Card.Text>
            </Card.Body>
        </Card>
}