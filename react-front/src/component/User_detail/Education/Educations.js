import { EducationCard } from './EducationCard'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { EducationWrite } from './EducationWrite';
import * as api from '../../../Api/Api';
import {useEffect} from 'react';
export function Educations(props){
    const [mode, setMode] = useState(false);
    const k='educations/';
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <h5>학력</h5>
            {props.info && props.info.map((data) => <Card.Body><EducationCard  name ={data[1]} major={data[2]} state={data[3]}/>
            <Link onClick={()=> setMode(!mode)}>Edit{data[4]} </Link>
            <Link onClick={() => {
                data = { id : data[0] }
                api.deleteInfo(k,data)
            }}  style={{color:"red"}}>Delete</Link>
            </Card.Body>)}
            {mode && <EducationWrite setMode ={setMode} mode={mode}/>}
            <Button style={{width:'3rem'}} onClick={(e) => setMode(!mode)}>+</Button>
        </Card>
    </>
}