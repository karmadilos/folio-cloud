import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Project } from './Project';
import { ProjectWrite } from './ProjectWrite';
export function Projects({id,isState}){
    const category='projects';
    const [mode, setMode]= useState("");
    const [projects, setProjects] = useState([]);
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [inputs, setInputs] = useState({
        id : "",
        p_name : "",
        p_description : "",
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
            p_name : inputs.p_name,
            p_description : inputs.p_description,
            start_date : dateToString(startdate),
            end_date : dateToString(enddate)
        };
        api.addInfo(category,data);
        ModeChange();
    }

    const UpdateData = () =>{
        const data = {
            id : inputs.id,
            p_name : inputs.p_name,
            p_description : inputs.p_description,
            start_date : dateToString(startdate),
            end_date : dateToString(enddate)
        };
        api.fixInfo(category,data);
        ModeChange();
    }

    const ModeChange = () =>{
        setInputs({
            p_name : "",
            p_description : "", 
        });
        setStartdate(new Date());
        setEnddate(new Date());
        setMode("loading");
    }

    const postChange = () =>{
        setInputs({
            p_name : "",
            p_description : "", 
        });
        setStartdate(new Date());
        setEnddate(new Date());
        setMode("post");
    }

    useEffect(() =>{
        if(inputs.p_name){
            setError(true);
        }
    },[inputs])

    useEffect(() => {
        const server = async () => {
            setProjects(await api.readInfo(category,id)); 
        }
        server();
    },[mode]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" style={{boxShadow : "4px 2px 10px rgba(136, 165, 191, 0.48), -4px -2px 10px #FFFFFF"}}>
            <Card.Title>프로젝트</Card.Title>
            {projects && projects.map((project,index) =>
                <Project key={index} category={category} project={project} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate} enddate={enddate} setEnddate={setEnddate} dateToString={dateToString}/>
            )}
            {(mode == "post"|| mode == "update") && <ProjectWrite mode={mode} error={error}UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate} enddate={enddate} setEnddate={setEnddate}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => postChange()} style={{width:'3rem',boxShadow : " 3px 3px 5px #0033b1, -3px -3px 5px #ffffff"}}>+</Button></CardGroup>}
        </Card>
    </>
}