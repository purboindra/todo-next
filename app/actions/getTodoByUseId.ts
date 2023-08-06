import { getCurrentUser } from "./getCurrentUser";

export async function getTodoByUserId() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const todo = await prisma?.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        todos: true,
      },
    });

    return todo;
  } catch (error: any) {
    console.log("ERROR FROM GET TODO BY USER ID", error);
    return null;
  }
}
