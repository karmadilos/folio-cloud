import React, {useState} from 'react';
import * as api from '../../../Api/Api';

export function Thumnail(){
    const [img, setImg] = useState();

    function handleSubmit(e){
        e.preventDefault();
        let fileToUpload = img
        console.log(img);
        const formData = new FormData();
        formData.append("file",fileToUpload);
        api.Upload(formData);
    }

    return(
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input onChange={(e) => {setImg(e.target.files[0])}} type="file" id="image" name="file" accept="image/*" className="file-custom"/>
            <button type="submit" className="btn btn-md btn-primary">Upload...</button>
        </form>
    )
}