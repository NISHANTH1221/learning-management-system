"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Form , FormControl , FormItem, FormField , FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
interface descriptionProps {
    initialData :{
        description : string,
    },
    courseId : string
}

const descriptionFormSchema = z.object({
    description : z.string().min(4,"Description must be greater than 4 characters") 
})

const DescriptionCard = ({initialData,courseId}:descriptionProps) => {
    const router = useRouter();
    const [isEditing ,setIsEditing ] =useState<Boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer <typeof descriptionFormSchema>>({
        resolver : zodResolver(descriptionFormSchema),
        defaultValues:initialData
    });

    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () =>{
        setIsEditing((current) =>!current)
    }

    const onSubmit= async (values:z.infer<typeof descriptionFormSchema>) =>{
        console.log(values);
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
        <div className="bg-slate-300 mt-6 p-4 border rounded-md">
            <div className="flex items-center justify-between font-medium">
                Description
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (
                            <>Cancel</>
                        ):
                    (
                            <>
                              <Pencil className="h-4 w-4 mr-2" /> 
                              Edit
                            </>
                        )
                    }
                </Button>
            </div> 
            {
                !isEditing && (
                    <p className="mt-4 text-md">{initialData.description}</p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                        >
                            <FormField 
                                control = {form.control}
                                name="description"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <Textarea 
                                            placeholder="e.g. 'This course is from 1-100 not from 0-1'"
                                            disabled = {isSubmitting}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button 
                            type="submit"
                            disabled = {isSubmitting || !isValid}
                            >
                                Save
                            </Button>

                        </form>
                    </Form>
                )
            }
        </div>
    );


}
 
export default DescriptionCard;