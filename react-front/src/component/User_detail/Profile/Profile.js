import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import * as api from '../../../Api/Api';
import { Thumnail } from './Thumnail';
import {Profile_Card} from './Profile_Card';
export function Profile(props){
    const [state, setState] = useState(false);
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <Profile_Card info={props}/>
        </Card>
    </>
}