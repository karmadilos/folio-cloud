import { Card,Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { EducationWrite } from './EducationWrite';
import * as api from '../../../Api/Api';
import { Education } from './Education';
export function Educations({user_id, isState}){
    const category='educations/';
    const [mode, setMode]= useState("");
    const [educations, setEducations] = useState([]);
    const [inputs, setInputs] = useState({
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
    }

    const UpdateEdu = () =>{
        api.fixInfo(category,inputs);
    }

    useEffect(() => {
        const server = async () => {
            setEducations(await api.readInfo(category)); 
        }
        server();
    },[]);
    console.log(educations);
    return<>
        <Card className="justify-content-md-center p-3" border="dark" style={{ width: '50rem' }}>
            <Card.Title>학력</Card.Title>
            {educations && educations.map((education) =>{
                <Education category={category} education={education} isState={isState}/>
                console.log(education);
            })}
            {mode && <EducationWrite mode={mode} UpdateEdu={UpdateEdu} PostEdu={PostEdu} setMode={setMode} ChangeInput={ChangeInput}/>}
            {isState && <Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button>}
        </Card>
    </>
}