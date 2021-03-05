import React from 'react';
import { Card } from 'react-bootstrap';

export function CertificateCard({certificate}){
        const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
      const start = new Date(certificate['issue_date']);
    return<Card>
            <Card.Body>
                <Card.Text>{certificate['c_name']}</Card.Text>
                <Card.Text>{certificate['c_agency']}</Card.Text>
                <Card.Text>{dateToString(start)}</Card.Text>
            </Card.Body>
        </Card>
}