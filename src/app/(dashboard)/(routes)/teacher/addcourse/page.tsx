"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
    FormControl,
    FormDescription
} from "@/components/ui/form"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    title : z.string().min(5,{message: "at least of 5 characters"}),

})
const AddNewCourse = () => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });
    const { isSubmitting , isValid } = form.formState;

    const onSubmit = async (values : z.infer<typeof formSchema>) =>{
        try{
            const response = await axios.post("/api/courses",values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast({
                title: "Course Added Successfully",
                description:"Go to Course to Edit the Course"
            })
        }catch(error){
            toast({
                title: "Error",
                description: "Something went wrong while creating a course",
            })
        }
    }

    return (
        <div className="max-w-5xl h-full p-6  flex  md:items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
                <p>Name your course</p>
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    >
                        <FormField 
                        control={form.control}
                        name="title"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel className="font-bold">Course Title</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    placeholder="Ex : Web Developement Course"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course ?
                                </FormDescription>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/teacher/courses">
                                <Button
                                type="button"
                                variant="ghost"
                                >
                                    Cancel

                                </Button>
                            </Link>
                            <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
 
export default AddNewCourse;