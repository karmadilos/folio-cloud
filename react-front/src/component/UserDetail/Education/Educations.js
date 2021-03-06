import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Education } from './Education';
import { EducationWrite } from './EducationWrite';
export function Educations({id, isState}){
    const category='educations';
    const [mode, setMode]= useState("");
    const [educations, setEducations] = useState([]);
    const [inputs, setInputs] = useState({
        id : "",
        s_name : "",
        major : "",
        state : "",
    });
    const ChangeInput = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const PostData = () =>{
        api.addInfo(category,inputs);
        ModeChange();
    }

    const UpdateData = () =>{
        api.fixInfo(category,inputs);
        ModeChange();
    }
    
    const ModeChange = () =>{
        setInputs({
            s_name : "",
            major : "",
            state :"",             
        });
        setMode("loading");
    }

    useEffect(() => {
        const server = async () => {
            setEducations(await api.readInfo(category,id)); 
        }
        server();
    },[mode]);
    console.log(mode);
    return<>
        <Card className="justify-content-md-center p-3" style={{ width: '50rem' }}>
            <Card.Title>학력</Card.Title>
            {educations && educations.map((education,index) =>
                <Education key={index} category={category} education={education} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} ModeChange={ModeChange}/>
            )}
            {(mode == "post"|| mode == "update") && <EducationWrite mode={mode} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}