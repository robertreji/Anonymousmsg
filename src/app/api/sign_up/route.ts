import { NextRequest} from "next/server";
import { sendEmail } from "@/lib/resend";
import { connectdb } from "@/lib/dbconnect";
import  User  from "@/models/Users.model";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest){
    await connectdb()
    const {email,username,password} = await req.json() 
    if(!(email && username && password ))throw new Error("email useername verifycode is required ")
    try {
        const existingUserByUsername = await User.findOne({username:username,verifyCode:true})
        const existingUserByEmail= await User.findOne({email})
        const verifyCode = Math.floor(10000 + Math.random()*90000).toString()

         if(existingUserByUsername){
             console.log("2\n")
            return Response.json({
                sucess:false,
                msg:" username already taken"
            },{status:500})
        }

        if(existingUserByEmail){
             console.log("3\n")
          if(existingUserByEmail?.isVerified)
          {
             console.log("4\n")
            return Response.json({
                sucess:false,
                msg:" user already exists with this email "
            },{status:201})
          }else{
             console.log("5\n")
            existingUserByEmail.verifyCode=verifyCode
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
            existingUserByEmail.isVerified = true
            await  existingUserByEmail.save()
          }
        }
       else{
         console.log("6\n")
            const hashedPassword = "hfirgh"
              console.log("7n")
            await User.create({
                  username,
                  email,
                  password: hashedPassword,
                  verifyCode,
                  verifyCodeExpiry:new Date(Date.now()+3600000), 
                  isVerified: false,
                  isAcceptingMessages:true,
                  messages: []
            })
        }
         console.log("7\n")
        const emailresponse = await sendEmail(email,username,verifyCode)
            if(!emailresponse.sucess)
            {
                 console.log("8\n")
                return Response.json({
                    sucess:false,
                    msg:"failed  to send verification email"},
                    {status:500})
            }
     
        return Response.json({
            sucess:false,
            msg:"Sucessfully regisytered user please verify  your email"},
            {status:200})
    } catch (error :unknown) {
    console.log(error)
        if(error instanceof Error) return Response.json({ms:"unabl nd email "},{status:400})
    }
    
    }