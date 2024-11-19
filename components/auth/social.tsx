import React from "react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { default_login_redirect } from "@/routes";
import { useSearchParams } from "next/navigation";

export default function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  //login with out action
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl || default_login_redirect });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-6 h-6" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-6 h-6" />
      </Button>
    </div>
  );
}
