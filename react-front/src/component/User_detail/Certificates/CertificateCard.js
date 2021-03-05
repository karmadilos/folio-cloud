import React from 'react';
import { Card } from 'react-bootstrap';

export function CertificateCard(props){
    return<Card border="light">
            <Card.Body>
                <Card.Text>{props}</Card.Text>
                <Card.Text>{props}</Card.Text>
            </Card.Body>
        </Card>
}