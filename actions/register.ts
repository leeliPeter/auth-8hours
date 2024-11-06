"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
export const register = async (values:z.infer<typeof RegisterSchema> )=>{
    //backend check login request
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }
    return {success:"Email Sent!"};
}

