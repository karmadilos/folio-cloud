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
            a_name : "",
            a_description : "", 
        });
        setMode("")
    }

    useEffect(() => {
        const server = async () => {
            setAwards(await api.readInfo(category,id)); 
        }
        server();
    },[]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" style={{ width: '50rem' }}>
            <Card.Title>수상이력</Card.Title>
            {awards && awards.map((award,index) =>
                <Award key={index} category={category} award={award} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput}/>
            )}
            {mode && <AwardWrite mode={mode} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}