"use server";
import { prisma } from "@/utils/prisma";

export default async function checkLogin(sessionId) {
  if (sessionId) {
    const auth = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });

    // if user already login, they can't open auth page
    if (auth) {
      return { data: auth, isLogged: true };
    }

    return { data: [], isLogged: false };
  }
}
