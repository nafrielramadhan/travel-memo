import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import checkSession from "@/utils/checkSession";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  const isLogin = await checkSession(sessionId);

  if (sessionId && isLogin) {
    redirect("/");
  }

  return <main>{children}</main>;
}
