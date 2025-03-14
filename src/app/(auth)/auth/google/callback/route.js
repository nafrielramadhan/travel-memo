import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const cookieStore = await cookies();

  const code = searchParams.get("code");
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  // code validation
  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  // get access token
  const accessToken = tokens.accessToken();

  // request user resources
  const response = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();

  // continue with oauth flow
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        // avatarUrl: data.picture,
      },
    });

    const newSession = await prisma.session.create({
      data: {
        userId: newUser.id,
      },
    });

    cookieStore.set("sessionId", newSession.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/journal");
}

/**
 * Flow after redirected to /auth/google/callback
 *
 * 1. Get code from url - searchParams
 * 2. Verify the code with codeVerifier from cookie
 * 3. Get accessToken
 */

/**
 * Flow for Continue with oauth
 *
 * 1. Find user in database
 * 2. Create user if user not in db
 *    2.1. Create new session for new user
 *    2.2. Set session to cookie
 *    2.3. Redirect to home
 * 3. If user already in db,create new session for the user
 *    3.1. Set session to cookie
 *    3.2. Redirect to home
 */
