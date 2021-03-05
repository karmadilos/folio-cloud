import { Button, Card } from 'react-bootstrap';
import { CertificateCard } from './CertificateCard'
import * as api from '../../../Api/Api'
export function Certificate({category,startdate,setMode,setStartdate, certificate, isState, setInputs,}){
    return<>
        <Card.Body >
            <CertificateCard  certificate={certificate}/>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="outline" onClick={() => {setMode("update"); setInputs({
                    id : certificate['id'],
                    c_name : certificate['c_name'],
                    c_agency : certificate['c_agency'],
                });
                setStartdate(startdate);
                }}>Edit </Button>
                <Button variant="outline" onClick={() => api.deleteInfo(category,certificate)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Card.Body>
    </>
}