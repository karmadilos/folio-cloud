import { Card,Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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
    console.log(mode);
    return<>
        <Card className="justify-content-md-center p-3" border="dark" style={{ width: '50rem' }}>
            <Card.Title>학력</Card.Title>
            {educations && educations.map((education,index) =>
                <Education key={index} category={category} education={education} isState={isState} mode={mode} PostEdu={PostEdu} setMode={setMode} UpdateEdu={UpdateEdu} setInputs={setInputs} ChangeInput={ChangeInput}/>
            )}
            {isState && <Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button>}
        </Card>
    </>
}