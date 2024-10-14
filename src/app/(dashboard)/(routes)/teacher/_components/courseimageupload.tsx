"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadCourseFile from "@/components/file-upload";
import Image from "next/image";
interface courseImageProps {
    initialData : {
        imageURL : string,
    },
    courseId : string
}

const imageURLschema = z.object({
    imageURL : z.string().min(4,"URL must be greater than 4 characters") 
})

const CourseImageUpload = ({initialData,courseId}:courseImageProps) => {
    const router = useRouter();
    const [isEditing ,setIsEditing ] =useState<Boolean>(false);
    const { toast } = useToast();


    const toggleEdit = () =>{
        setIsEditing((current) =>!current)
    }

    const onSubmit= async (values:z.infer<typeof imageURLschema>) =>{
        try{
           const response =  await axios.patch(`/api/courses/${courseId}`,values);
           if(response.status==200){
            toast({
                description:"Description Updated Successfully"
            })
            toggleEdit()
            router.refresh()
           }

        }catch(error){
            toast({
                title: "Error",
                description: "Error while updating the course title",
            }); 
        }
    }

    return (
        <div className="bg-slate-300 my-6 p-4 border rounded-md">
            <div className="flex items-center justify-between font-medium">
                Course Image
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (
                            <>Cancel</>
                        ):
                        (
                            initialData.imageURL ?
                            <>
                              <Pencil className="h-4 w-4 mr-2" /> 
                              Edit
                            </>
                            :
                            <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an Image
                            </>
                        )
                    }
                </Button>
            </div>
            {
                initialData.imageURL && !isEditing && <Image src={initialData.imageURL} alt="thumbnail" className="aspect-video object-fill"/>
            }
            {
                initialData.imageURL && isEditing &&
                <UploadCourseFile 
                    endPoint = "courseImage"
                    onChange = {(url)=>{
                    onSubmit({imageURL : url})
                    }}
                />
            }
            {
                !initialData.imageURL && isEditing &&
                <UploadCourseFile 
                    endPoint = "courseImage"
                    onChange = {(url)=>{
                    onSubmit({imageURL : url})
                    }}
                />
            }
            {
                !initialData.imageURL && !isEditing &&
                <div className="flex flex-col items-center justify-center aspect-video border-2 mt-6 bg-slate-200">
                    <ImageIcon className="w-4 h-4"/>
                </div>
            }
        </div>
    );


}
 
export default CourseImageUpload;