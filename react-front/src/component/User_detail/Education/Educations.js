import { Education_Card } from './Education_Card'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Education_Write } from './Education_Write';
import * as api from '../../../Api/Api';
export function Educations(props){
    const [mode, setMode] = useState(false);
    useEffect(() => {
        function change(e){
            e.preventDefault();
            setMode(!mode);
        }
    },[]);

    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>학력</h5>
            {props.info && props.info.map((data, index) => <Card.Body><Education_Card key={index} num={data[0]} name ={data[1]} major={data[2]} state={data[3]}/>
            <Link onClick={()=> setMode(!mode)}>Edit{index} </Link>
            <Link onClick={() => {
                const k='education';
                console.log({index});
                api.deleteInfo(k,{index})
            }}  style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {mode && <Education_Write/>}
            <Button style={{width:'3rem'}} onClick={(e) => setMode(!mode)}>+</Button>
        </Card>
    </>
}