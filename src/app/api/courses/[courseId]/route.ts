import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params } : { params : { courseId : string}} ){
    try{

        const { userId } = auth();

        const { courseId } = params;

        const values = await req.json();


        if(!userId){
            return new NextResponse("unauthorized access",{status:401});
        }
        
        await prisma.course.update({
            where:{
                id : courseId,
                userId
            },
            data :{
                ...values
            }
        })

        return NextResponse.json({
            message : "Title Updated Successfully"
        },{
            status : 200
        });

        
    }catch(error){
        return new NextResponse("There is something wrong with us",{status:500});
    }
}