import { Button, Card } from 'react-bootstrap';
import { CertificateCard } from './CertificateCard'
import * as api from '../../../Api/Api'
export function Certificate({category,mode,setMode, education, isState, UpdateData, PostData, setInputs,ChangeInput}){
    return<>
        <Card.Body>
            <CertificateCard education={education}/>
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