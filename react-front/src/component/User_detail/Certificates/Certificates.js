import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Certificate } from './Certificate';
import { CertificateWrite } from './CertificateWrite';
export function Certificates({isState}){
    const category='certificates/';
    const [mode, setMode]= useState("");
    const [certificates, setcertificates] = useState([]);
    const [inputs, setInputs] = useState({
        id : "",
        c_name : "",
        c_agemcy : "",
        issue_date : new Date()
    });
    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
      }
    const ChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const PostData = () =>{
        api.addInfo(category,inputs);
        setMode("");
    }

    const UpdateData = () =>{
        api.fixInfo(category,inputs);
        setInputs({
            c_name : "",
            c_agemcy : "",
            issue_date : new Date()   
        });
        setMode("")
    }

    useEffect(() => {
        const server = async () => {
            // setcertificates(await api.readInfo(category)); 
        }
        server();
    },[]);
    console.log(mode);
    console.log(dateToString(inputs.issue_date));
    return<>
        <Card className="justify-content-md-center p-3" border="dark" style={{ width: '50rem' }}>
            <Card.Title>자격증</Card.Title>
            {certificates && certificates.map((certificate,index) =>
                <Certificate key={index} category={category} certificate={certificate} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput}/>
            )}
            {mode && <CertificateWrite mode={mode} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} dateToString={dateToString} />}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}