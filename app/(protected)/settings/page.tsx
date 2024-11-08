import { auth, signOut } from "@/auth";
export default async function SettingPage() {
  const session = await auth();
  session?.user.role;
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
