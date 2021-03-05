import { Card,Button, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as api from '../../../Api/Api';
import { Project } from './Project';
import { ProjectWrite } from './ProjectWrite';
export function Projects({isState}){
    const category='projects';
    const [mode, setMode]= useState("");
    const [projects, setProjects] = useState([]);
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [inputs, setInputs] = useState({
        id : "",
        a_name : "",
        a_description : "",
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
            p_name : inputs.p_name,
            p_description : inputs.p_description,
            start_date : dateToString(startdate),
            end_date : dateToString(enddate)
        };
        api.addInfo(category,data);
        setMode("");
    }

    const UpdateData = () =>{
        const data = {
            p_name : inputs.p_name,
            p_description : inputs.p_description,
            start_date : dateToString(startdate),
            end_date : dateToString(enddate)
        };
        api.fixInfo(category,data);
        setInputs({
            p_name : "",
            p_description : "", 
        });
        setStartdate(new Date());
        setEnddate(new Date());
        setMode("")
    }

    useEffect(() => {
        const server = async () => {
            setProjects(await api.readInfo(category)); 
        }
        server();
    },[]);
    return<>
        <Card className="justify-content-md-center my-3 p-3" border="dark" style={{ width: '50rem' }}>
            <Card.Title>프로젝트</Card.Title>
            {projects && projects.map((project,index) =>
                <Project key={index} category={category} project={project} isState={isState} mode={mode} PostData={PostData} setMode={setMode} UpdateData={UpdateData} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate} enddate={enddate} setEnddate={setEnddate}/>
            )}
            {mode && <ProjectWrite mode={mode} UpdateData={UpdateData} PostData={PostData} setMode={setMode} inputs={inputs} setInputs={setInputs} ChangeInput={ChangeInput} startdate={startdate} setStartdate={setStartdate} enddate={enddate} setEnddate={setEnddate}/>}
            {isState && <CardGroup className="justify-content-md-center"><Button onClick={() => setMode("post")} style={{width:'3rem'}}>+</Button></CardGroup>}
        </Card>
    </>
}