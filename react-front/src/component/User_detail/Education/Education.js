import { Button, Card } from 'react-bootstrap';
import { EducationCard } from './EducationCard'
import * as api from '../../../Api/Api'
export function Education({category,mode,setMode, education, isState, UpdateEdu, PostEdu, setInputs,ChangeInput}){
    return<>
        <Card.Body>
            <EducationCard education={education}/>
            {isState &&(<>
                <Button variant="outline-primary" onClick={() => {setMode("update"); setInputs({
                    id : education['id'],
                    s_name : education['s_name'],
                    major : education['major'],
                    state : education['state'],             
                });}}>Edit </Button>
                <Button variant="outline-danger" onClick={() => api.deleteInfo(category,education)} style={{color:"red"}}>
                    Delete
                </Button></>)}
        </Card.Body>
    </>
}