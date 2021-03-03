import { AwardCard } from './AwardCard'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { AwardWrite } from './AwardWrite';

export function Awards(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>수상 이력</h5>
            {props.info && props.info.map((data,index) => <Card.Body><AwardCard key={index} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link to="#">Edit </Link>
            <Link to="#" style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {state && <AwardWrite state/>}
            <Button style={{width:'3rem'}} onClick={(e) => setState(!state)}>+</Button>
        </Card>
    </>
}