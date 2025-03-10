"use server";
import { google } from "@/utils/arctic";
import * as arctic from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function continueWithGoogleAction(_) {
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  // Save code verifier for request user resource
  const cookieStore = await cookies();
  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  // Redirect to "choose account page"
  redirect(url.href);
}
