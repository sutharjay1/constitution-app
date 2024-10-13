import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/auth";

export async function getSession() {
  const session = await getServerSession(authOptions);
  console.log(`Server action session: ${JSON.stringify(session, null, 2)}`);
  return session;
}
