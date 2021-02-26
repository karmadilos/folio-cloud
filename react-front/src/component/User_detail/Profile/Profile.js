import React, {useState} from 'react';
import * as api from '../../../Api/Api';
import { Thumnail } from './Thumnail';

export function Profile(){
    const [img, setImg] = useState();


    return(
        <div>
            <Thumnail/>
        </div>
    )
}