import React from 'react';
import { Card } from 'react-bootstrap';

export function ProjectCard({project}){
        const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
      const start = new Date(project['start_date']);
      const end = new Date(project['end_date']);
    return<Card>
            <Card.Body>
                <Card.Text>{project['p_name']}</Card.Text>
                <Card.Text>{project['p_description']}</Card.Text>
                <Card.Text>{dateToString(start)} ~ {dateToString(end)}</Card.Text>
            </Card.Body>
        </Card>
}