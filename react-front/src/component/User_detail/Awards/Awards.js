import { Award_Card } from './Award_Card'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { Award_Write } from './Award_Write';

export function Awards(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>수상 이력</h5>
            {props.info && props.info.map((data) => <Card.Body><Award_Card num={data[0]} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link>Edit </Link>
            <Link style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {state && <Award_Write state/>}
            <Button style={{width:'3rem'}} onClick={(e) => setState(!state)}>+</Button>
        </Card>
    </>
}