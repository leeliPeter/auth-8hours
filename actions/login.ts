"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {signIn} from "@/auth";
import { default_login_redirect } from "@/routes";
import { AuthError } from "next-auth";
export const login = async (values:z.infer<typeof LoginSchema> )=>{
    //backend check login request
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }
    const {email,password} = validatedFields.data;

    try{
        await signIn("credentials",{email,password
            ,redirectTo: default_login_redirect
        });
    }catch(e){
        if(e instanceof AuthError){
            switch(e.type){
                case "CredentialsSignin": return {error:"Invalid credentials"};
                default: return {error:"Something went wrong"};
            }
        }
    throw e;
    }
}



