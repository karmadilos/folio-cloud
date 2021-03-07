import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Award } from './Award';
import { AwardWrite } from './AwardWrite';
export function Awards({id,isState}){
    const category='awards';
    const [mode, setMode]= useState("");
    const [awards, setAwards] = useState([]);
    const [inputs, setInputs] = useState({
        id : "",
        a_name : "",
        a_description : "",
    });
    const [error, setError] = useState(false);

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
            a_name : "",
            a_description : "", 
        });
        setMode("loading");
    }

    const postChange = () =>{
        setInputs({
            a_name : "",
            a_description : "", 
        });
        setMode("post");
    }

    useEffect(() =>{
        if(inputs.a_name){
            setError(true);
        }
    },[inputs])

    useEffect(() => {
        const server = async () => {
            setAwards(await api.readInfo(category,id)); 
        }
        server();
    },[mode]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" style={{boxShadow : "4px 2px 10px rgba(136, 165, 191, 0.48), -4px -2px 10px #FFFFFF"}}>
            <Card.Title>수상이력</Card.Title>
            {awards && awards.map((award,index) =>
                <Award key={index} category={category} award={award} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} ModeChange={ModeChange}/>
            )}
            {(mode == "post"|| mode == "update") && <AwardWrite mode={mode} error={error} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => postChange()} style={{width:'3rem' ,boxShadow : " 3px 3px 5px #0033b1, -3px -3px 5px #ffffff"}}>+</Button></CardGroup>}
        </Card>
    </>
}