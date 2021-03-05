import { Card } from 'react-bootstrap';
import { EducationCard } from './EducationCard'
export function Education({category, setMode, education, isState, setInputs}){
    return<>
        <Card.Text>
            <EducationCard education={education} category={category} setMode={setMode} isState={isState} setInputs={setInputs}/>
        </Card.Text>
    </>
}