import React from 'react';
import { Card , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import {Education_Write} from './Education_Write';
import {Ex} from './Ex';
export function Education_Card(props){
    const [state, setState] = useState(true);

    return<Card border="light">
                <Card.Body>
                    <Card.Text>{props.name}</Card.Text>
                    <Card.Text>{props.major}</Card.Text>
                    <Link>Edit</Link>
                </Card.Body>
                {
                    state ? <Ex/> : <Education_Write/>
                }
                <Button onClick={(e) => setState(!state)}>+</Button>
            </Card>
}