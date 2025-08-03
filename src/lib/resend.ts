// import { EmailTemplate } from '../../../components/EmailTemplate';

import { Resend } from 'resend';
import VerificationEmail from '../../emails/verificationemail';
import { ApiResponse } from '@/types/apiresponse';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
    email:string,
    username:string,
    verifycode:string):Promise<ApiResponse>
    {
        try {
            await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'verification email',
            react: VerificationEmail ({username:username ,otp:verifycode}),
    });
        return {
            sucess:true,
            msg:"sucessfully    send verification email"
            }
        } catch (error :unknown) {
            if(error instanceof Error)
                throw new Error("error while sending email") 
            return {
                sucess:false,
                msg:"failed  to send verification emai"
            }
        }

}