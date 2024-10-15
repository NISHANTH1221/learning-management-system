"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
interface uploadFileProps {
    onChange : (url: string) => void,
    endPoint : keyof typeof  ourFileRouter
}
const UploadCourseFile = (  { onChange , endPoint} : uploadFileProps) => {
    return (
        <div>
            <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res)=>{
             console.log("Upload Complete",res)
             onChange(res[0]?.url)
            }}
            onUploadError={(error : Error)=>{
                console.log("error",error)
            }}
            />
        </div>
    );
}
 
export default UploadCourseFile;