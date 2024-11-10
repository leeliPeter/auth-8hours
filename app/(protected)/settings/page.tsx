"use client";

import { signOutAction } from "@/actions/signOut";
export default function SettingPage() {
  const onClick = () => {
    signOutAction();
  };
  return (
    <div className="bg-white rounded-xl p-10">
      <button onClick={onClick}>Logout</button>
    </div>
  );
}
