import { Button, Card } from 'react-bootstrap';
import { AwardCard } from './AwardCard'
export function Award({category, setMode, award, isState, setInputs}){
    return<>
        <Card.Text>
            <AwardCard award={award} category={category} setMode={setMode} isState={isState} setInputs={setInputs}/>
        </Card.Text>
    </>
}