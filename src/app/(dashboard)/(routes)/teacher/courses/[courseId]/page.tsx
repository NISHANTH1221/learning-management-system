import { IconBadge } from "@/components/icon-badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
const CourseCard = async ({ params } : {params:{courseId : string}}) => {

    const { userId } = auth();

    if(!userId){
       return  redirect("/")
    }
    const course = await prisma.course.findUnique({
        where :{
            id : params.courseId,
        }
    })

    if(!course){
        return redirect("/teacher/courses")
    }

    const requiredFeilds = [
        course.name,
        course.description,
        course.price,
        course.imageURL,
        course.categoryId
    ]

    const totalFields = requiredFeilds.length;
    const completedFields = requiredFeilds.filter(Boolean).length; 

    const completionText = `Completed (${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <p className="text-2xl font-bold">Course SetUp</p>
                    <p className="text-sm text-slate-600">{completionText}</p>
                </div>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-6 mt-6 h-24">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-2xl">Customize your course</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CourseCard;