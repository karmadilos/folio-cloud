import { Card } from 'react-bootstrap';
import { CertificateCard } from './CertificateCard'
export function Certificate({category,setMode,setStartdate, certificate, isState, setInputs,}){
    return<>
        <Card.Text >
            <CertificateCard  certificate={certificate} category={category} setMode={setMode} isState={isState} setInputs={setInputs} setStartdate={setStartdate}/>
        </Card.Text>
    </>
}