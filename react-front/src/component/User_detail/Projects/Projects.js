import {Project_Card} from './Project_Card'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {useState} from 'react';
import {Project_Write} from './Project_Write';
export function Projects(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>프로젝트</h5>
            {props.info && props.info.map((data) => <Card.Body><Project_Card num={data[0]} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link>Edit </Link>
            <Link style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {state && <Project_Write state/>}
            <Button style={{width:'3rem'}} onClick={(e) => setState(!state)}>+</Button>
        </Card>
    </>
}