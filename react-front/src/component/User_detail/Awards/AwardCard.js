import React from 'react';
import { Card } from 'react-bootstrap';
export function AwardCard({award}){
    return<Card>
            <Card.Body>
                <Card.Text>{award.a_name}</Card.Text>
                <Card.Text>{award.a_description}</Card.Text>
            </Card.Body>
        </Card>
}