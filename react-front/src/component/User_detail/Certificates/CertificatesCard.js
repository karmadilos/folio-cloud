import React from 'react';
import { Card } from 'react-bootstrap';

export function CertificateCard(props){
    return<Card border="light">
            <Card.Body>
                <Card.Text>{props[1]}</Card.Text>
                <Card.Text>{props[3]}</Card.Text>
            </Card.Body>
        </Card>
}