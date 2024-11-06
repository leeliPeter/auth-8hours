"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
export const register = async (values:z.infer<typeof RegisterSchema> )=>{
    //backend check login request
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }
    //hash password
    const {email, password,name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser){
        return {error:"User already exists"};
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });
    // TODO: send email
    return {success:"User created!"};
}

