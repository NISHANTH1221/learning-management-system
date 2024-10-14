"use client"
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
interface uploadFileProps {
    onChange : (url: string) => void,
    endPoint : keyof typeof  ourFileRouter
}
const UploadCourseFile = (  { onChange , endPoint} : uploadFileProps) => {
    const {toast} = useToast();
    return (
        <div>
            <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res)=>{
             onChange(res?.[0].url)
            }}
            onUploadError={()=>{
            toast({
                title: "Error while uploading Image to cloud"
            })
            }}
            />
        </div>
    );
}
 
export default UploadCourseFile;