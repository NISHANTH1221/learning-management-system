import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try{
        const { title } = await req.json();
        const { userId } = auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        };
         
        const course = await prisma.course.create({
            data:{
                title,
                userId
            }
        });

        return NextResponse.json({course},{status:200})


    }catch(error){
        console.error(error);
        return NextResponse.json({message: "Internal Server Error"},{status: 500});
    }
}