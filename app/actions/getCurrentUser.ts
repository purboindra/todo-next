import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma?.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return null;

    return {
      ...user,
    };
  } catch (error: any) {
    console.log("ERROR GET CURRENT USER", error);
    return null;
  }
}
