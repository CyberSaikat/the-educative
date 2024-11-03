import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCardBody from "./cardContent";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session.user;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileCardBody userdata={user}/>
      </CardContent>
    </Card>
  );
}
