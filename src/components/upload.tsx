import { Button, Input } from "antd"
import { AuthApi } from "../configs/API"
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { useState } from "react";
import axios from "axios";



export const Upload = () => {
    const [image, setImage] = useState<any>()

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('upload_preset', 'testuploadimage')
        formData.append('file', image)
        const res = await axios.post('https://api.cloudinary.com/v1_1/dlyeizufn/image/upload', formData)
        console.log(res.data)
    }
    return (
        <div>
            <h1>upload</h1>
            <Input type="file" onChange={(e: any) => setImage(e.target.files[0])} />
            <Button type="primary" onClick={handleUpload}>Upload</Button>
        </div>
    )
}