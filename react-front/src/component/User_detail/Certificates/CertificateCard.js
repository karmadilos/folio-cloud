import React from 'react';
import { Card } from 'react-bootstrap';
export function CertificateCard({certificate}){
    return<Card>
            <Card.Body>
                <Card.Text>{certificate['c_name']}</Card.Text>
                <Card.Text>{certificate['c_agency']}</Card.Text>
                <Card.Text>{certificate['issue_date']}</Card.Text>
            </Card.Body>
        </Card>
}