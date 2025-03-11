import { cookies } from "next/headers";
import Navbar from "./components/navbar";
import checkLogin from "@/utils/checkSession";

export default async function layout({ children }) {
  const cookiesStore = await cookies();
  const getCookies = cookiesStore.get("sessionId")?.value;
  const isLogin = await checkLogin(getCookies);

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <div className="flex min-h-screen bg-gray-50">
        <div className="p-5 mx-auto w-full">{children}</div>
      </div>
    </div>
  );
}
