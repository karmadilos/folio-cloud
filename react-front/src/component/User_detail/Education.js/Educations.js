import {Education_Card} from './Education_Card'
import { Card } from 'react-bootstrap';
export function Educations(props){
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <Card.Header><h5>학력</h5></Card.Header>
            <Card.Body><Education_Card name ={props.s_name} major={props.major} state={props.state}/></Card.Body>
        </Card>
    </>
}