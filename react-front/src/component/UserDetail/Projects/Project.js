import { Card } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard'
export function Project({category,setMode,setStartdate, project, isState, setInputs,setEnddate}){
    return<>
        <Card.Text>
            <ProjectCard project={project} category={category} setMode={setMode} isState={isState} setInputs={setInputs} setStartdate={setStartdate} setEnddate={setEnddate}/>
        </Card.Text>
    </>
}