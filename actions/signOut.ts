"use server";

import { signOut } from "@/auth";

export const signOutAction = async () => {
  //to some server action
  await signOut();
};
