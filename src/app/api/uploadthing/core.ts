import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () =>{
    const { userId } = auth();
    if(!userId){
      throw new Error("unauthorized error")
    }
    return { userId };
}

export const ourFileRouter = {
    courseImage : f({image : {maxFileSize : "4MB", maxFileCount:1}})
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}),
    courseAttachments : f(["image","pdf","text","audio"])
        .middleware(()=> handleAuth())
        .onUploadComplete(()=>{}),
    chapterVideo : f({video:{maxFileSize:"256MB", maxFileCount:1}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
