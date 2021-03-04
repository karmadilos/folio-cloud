import { Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { EducationCard } from './EducationCard'
import { EducationWrite } from './EducationWrite';
import * as api from '../../../Api/Api'
export function Education({category,mode,setMode, education, isState, UpdateEdu, PostEdu, setInputs,ChangeInput}){
    return<>
        <Card.Body>
            <EducationCard education={education}/>
            {isState &&(<>
                <Link onClick={() => {setMode("update"); setInputs({
                    s_name : education[1],
                    major : education[3],
                    state : education[4],             
                });}}>Edit </Link>
                <Link onClick={() => api.deleteInfo(category,education)} style={{color:"red"}}>
                    Delete
                </Link></>)}
            {mode && <EducationWrite education={education} mode={mode} UpdateEdu={UpdateEdu} PostEdu={PostEdu} setMode={setMode} setInputs={setInputs} ChangeInput={ChangeInput} />}
        </Card.Body>
    </>
}