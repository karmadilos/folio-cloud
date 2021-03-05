import { Button, Card } from 'react-bootstrap';
import { EducationCard } from './EducationCard'
import * as api from '../../../Api/Api'
export function Education({category, setMode, education, isState, setInputs}){
    return<>
        <Card.Body>
            <EducationCard education={education}/>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="outline" onClick={() => {setMode("update"); setInputs({
                    id : education['id'],
                    s_name : education['s_name'],
                    major : education['major'],
                    state : education['state'],             
                });}}>Edit </Button>
                <Button variant="outline" onClick={() => api.deleteInfo(category,education)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Card.Body>
    </>
}