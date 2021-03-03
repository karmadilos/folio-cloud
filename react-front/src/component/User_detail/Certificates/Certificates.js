import {CertificateCard} from './CertificatesCard'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {useState} from 'react';
import {CertificateWrite} from './CertificateWrite';
export function Certificates(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>자격증</h5>
            {props.info && props.info.map((data) => <Card.Body><CertificateCard num={data[0]} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link>Edit </Link>
            <Link style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {state && <CertificateWrite state/>}
            <Button style={{width:'3rem'}} onClick={(e) => setState(!state)}>+</Button>
        </Card>
    </>
}