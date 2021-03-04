import { Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { EducationCard } from './EducationCard'
import * as api from '../../../Api/Api'
export function Education({category, education, isState}){
    return<>
        <Card.Body>
            <EducationCard education={education}/>
            {isState &&(<>
                <Link >Edit</Link>
                <Link onClick={() => api.deleteInfo(category,education[0])} style={{color:"red"}}>
                    Delete
                </Link></>)}
        </Card.Body>
    </>
}