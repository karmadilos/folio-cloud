import { Button, Card } from 'react-bootstrap';
import { AwardCard } from './AwardCard'
import * as api from '../../../Api/Api'
export function Award({category, setMode, award, isState, setInputs}){
    return<>
        <Card.Body>
            <AwardCard award={award}/>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="outline" onClick={() => {setMode("update"); setInputs({
                    id : award['id'],
                    s_name : award['s_name'],
                    major : award['major'],
                    state : award['state'],             
                });}}>Edit </Button>
                <Button variant="outline" onClick={() => api.deleteInfo(category,award)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Card.Body>
    </>
}