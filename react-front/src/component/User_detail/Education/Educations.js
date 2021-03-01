import {Education_Card} from './Education_Card'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {useState} from 'react';
import {Education_Write} from './Education_Write';
export function Educations(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>학력</h5>
            {props.info && props.info.map((data) => <Card.Body><Education_Card num={data[0]} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link>Edit </Link>
            <Link style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {state && <Education_Write state/>}
            <Button style={{width:'3rem'}} onClick={(e) => setState(!state)}>+</Button>
        </Card>
    </>
}