import React from 'react';
import { Card } from 'react-bootstrap';

import {ProfileCard} from './ProfileCard';
export function Profile(props){
    return<>
        <Card>
            <ProfileCard info={props}/>
        </Card>
    </>
}