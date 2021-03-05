import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Certificate } from './Certificate';
import { CertificateWrite } from './CertificateWrite';
export function Certificates({isState}){
    const category='certificates';
    const [mode, setMode]= useState("");
    const [certificates, setCertificates] = useState([]);
    const [startdate, setStartdate] = useState(new Date());
    const [inputs, setInputs] = useState({
        id : "",
        c_name : "",
        c_agency : "",
    });

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }

    const ChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const PostData = () =>{
        const data = {
            c_name : inputs.c_name,
            c_agency : inputs.c_agency,
            issue_date : dateToString(startdate)
        }
        api.addInfo(category,data);
        setMode("");
    }

    const UpdateData = () =>{
        const data = {
            id : inputs.id,
            c_name : inputs.c_name,
            c_agency : inputs.c_agency,
            issue_date : dateToString(startdate)
        }
        api.fixInfo(category,data);
        setInputs({
            c_name : "",
            c_agency : "", 
        });
        setStartdate(new Date());
        setMode("")
    }

    useEffect(() => {
        const server = async () => {
            setCertificates(await api.readInfo(category)); 
        }
        server();
    },[]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" style={{ width: '50rem' }}>
            <Card.Title>자격증</Card.Title>
            {certificates && certificates.map((certificate,index) =>
                <Certificate key={index} category={category} certificate={certificate} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate}/>
            )}
            {mode && <CertificateWrite mode={mode} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate} />}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}