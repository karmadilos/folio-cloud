import { Button, Card } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard'
import * as api from '../../../Api/Api'
export function Project({category,startdate,setMode,setStartdate, project, isState, setInputs,enddate,setEnddate}){
    return<>
        <Card.Body >
            <ProjectCard  project={project}/>
            {isState &&(<div className="justify-content-md-center p-3">
                <Button variant="outline" onClick={() => {setMode("update"); setInputs({
                    id : project['id'],
                    p_name : project['p_name'],
                    p_description : project['p_description'],
                });
                setStartdate(startdate);
                setEnddate(enddate);
                }}>Edit </Button>
                <Button variant="outline" onClick={() => api.deleteInfo(category,project)} style={{color:"red"}}>
                    Delete
                </Button></div>)}
        </Card.Body>
    </>
}