import { AwardCard } from './AwardCard'
import { Card,Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState } from 'react';

export function Awards(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
        </Card>
    </>
}