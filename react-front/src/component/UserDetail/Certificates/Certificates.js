import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Certificate } from './Certificate';
import { CertificateWrite } from './CertificateWrite';
export function Certificates({id,isState}){
    const category='certificates';
    const [mode, setMode]= useState("");
    const [certificates, setCertificates] = useState([]);
    const [startdate, setStartdate] = useState(new Date());
    const [inputs, setInputs] = useState({
        id : "",
        c_name : "",
        c_agency : "",
    });
    const [error, setError] = useState(false);

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
        ModeChange();
    }

    const UpdateData = () =>{
        const data = {
            id : inputs.id,
            c_name : inputs.c_name,
            c_agency : inputs.c_agency,
            issue_date : dateToString(startdate)
        }
        api.fixInfo(category,data);
        ModeChange()
    }

    const ModeChange = () =>{
        setInputs({
            c_name : "",
            c_agency : "", 
        });
        setStartdate(new Date());
        setMode("loading");
    }

    const postChange = () =>{
        setInputs({
            c_name : "",
            c_agency : "", 
        });
        setStartdate(new Date());
        setMode("post");
    }

    useEffect(() =>{
        if(inputs.c_name){
            setError(true);
        }
    },[inputs])

    useEffect(() => {
        const server = async () => {
            setCertificates(await api.readInfo(category,id)); 
        }
        server();
    },[mode]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" style={{boxShadow : "4px 2px 10px rgba(136, 165, 191, 0.48), -4px -2px 10px #FFFFFF"}}>
            <Card.Title>자격증</Card.Title>
            {certificates && certificates.map((certificate,index) =>
                <Certificate key={index} category={category} certificate={certificate} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate}/>
            )}
            {(mode == "post"|| mode == "update") && <CertificateWrite mode={mode} error={error} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => postChange()} style={{width:'3rem',boxShadow : " 3px 3px 5px #0033b1, -3px -3px 5px #ffffff"}}>+</Button></CardGroup>}
        </Card>
    </>
}