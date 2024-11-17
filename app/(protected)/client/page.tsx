"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Client() {
  const user = useCurrentUser();
  return (
    <div className="text-white">
      <UserInfo user={user} label="📱Client Component" />
    </div>
  );
}
