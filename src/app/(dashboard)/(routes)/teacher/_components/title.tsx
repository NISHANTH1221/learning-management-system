"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form , FormControl , FormItem, FormField , FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import prisma from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
interface titleProps {
    initialData :{
        title : string ,
    },
    courseId : string
}

const titleFormSchema = z.object({
    title : z.string().min(4,"Title must be greater than 4 characters") 
})

const TitleCard = ({initialData,courseId}:titleProps) => {
    const [isEditing ,setIsEditing ] =useState<Boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer <typeof titleFormSchema>>({
        resolver : zodResolver(titleFormSchema),
        defaultValues:initialData
    });

    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () =>{
        setIsEditing((current) =>!current)
    }

    const onSubmit= async (values:z.infer<typeof titleFormSchema>) =>{
        console.log(values);
        try{

        }catch(error){
            toast({
                title: "Error",
                description: "Error while updating the course title",
            }); 
        }
    }

    return (
        <div className=" mt-6 p-4 border rounded-md">
            <div className="flex items-center justify-between font-medium">
                Title
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
                    <p className="mt-4 text-md">{initialData.title}</p>
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
                                name="title"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                            placeholder="e.g. 'web developement course'"
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
 
export default TitleCard;