"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

export default function AdminPage() {
  const onServerActionClick = async () => {
    admin().then((data) => {
      if (data.error) {
        toast.error("Server Action Failed");
      }
      if (data.success) {
        toast.success("Server Action Success");
      }
    });
  };

  const onApiRouteClick = async () => {
    await fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("API Route Success");
      } else {
        toast.error("API Route Failed");
      }
    });
  };

  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message={`Welcome, ${role}`} />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
