import React from 'react';
import { Card } from 'react-bootstrap';

import {ProfileCard} from './ProfileCard';
export function Profile(props){
    return<>
        <Card border="dark" style={{ width: '40rem' }}>
            <ProfileCard info={props}/>
        </Card>
    </>
}