"use server";
import * as z from "zod";
import {db} from "@/lib/db";
import { SettingsSchema    } from "@/schemas";
import {getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";
import bcript from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values:z.infer<typeof SettingsSchema>)=>{
    const user = await currentUser();
    
    if(!user){
        return {error:"Unauthorized"}
    }
    if(!user.id){
        return {error:"Unauthorized"}
    }
    const dbUser = await getUserById(user.id);

    if(!dbUser){
        return {error:"Unauthorized"}
    }
    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }
    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email);
        if(existingUser && existingUser.id !== user.id){
            return {error:"Email is already in use."}
        }
        const verification = await generateVerificationToken(values.email);
        await sendVerificationEmail(verification.email,verification.token);
        return {success:"Verification email sent!"}
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordsMatch = await bcript.compare(values.password,dbUser.password);

        if(!passwordsMatch){
            return {error:"Incorrect password."}
        }
        const hasedPassword = await bcript.hash(values.newPassword,10);
        values.password = hasedPassword
        values.newPassword = undefined;
    }

    await db.user.update({
        where:{id:user.id},
        data:{...values}
    })
    return {success:"Settings updated!"}
}


