"use client";

import { signOutAction } from "@/actions/signOut";

interface LogoutBtnProps {
  children?: React.ReactNode;
}
export const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const onClick = () => {
    signOutAction();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
