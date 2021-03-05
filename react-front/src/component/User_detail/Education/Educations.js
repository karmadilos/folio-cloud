import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Education } from './Education';
import { EducationWrite } from './EducationWrite';
export function Educations({isState}){
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

    const PostEdu = () =>{
        api.addInfo(category,inputs);
        setMode("");
    }

    const UpdateEdu = () =>{
        api.fixInfo(category,inputs);
        setInputs({
            s_name : "",
            major : "",
            state :"",             
        });
        setMode("")
    }

    useEffect(() => {
        const server = async () => {
            setEducations(await api.readInfo(category)); 
        }
        server();
    },[]);
    return<>
        <Card className="justify-content-md-center p-3" border="dark" style={{ width: '50rem' }}>
            <Card.Title>학력</Card.Title>
            {educations && educations.map((education,index) =>
                <Education key={index} category={category} education={education} isState={isState} mode={mode} PostEdu={PostEdu} setMode={setMode} UpdateEdu={UpdateEdu} setInputs={setInputs} ChangeInput={ChangeInput}/>
            )}
            {mode && <EducationWrite mode={mode} UpdateEdu={UpdateEdu} PostEdu={PostEdu} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} />}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}