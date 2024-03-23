import { cookies, headers } from "next/headers";
import HeaderItem from "./ui/headerItem";
import { VerifyTokenCookie } from "../../../pages/definitions";
import ProfileButton from "./ProfileButton";

export default function Header() {
  const headerList = headers();
  // console.log({ headerList });

  const cookieList = cookies();
  const userCookieString = cookieList.get("User-cookie")?.value || "";
  let userCookie: VerifyTokenCookie = { user: undefined, token: undefined };
  try {
    userCookie = JSON.parse(userCookieString);
  } catch (e) {}

  // console.log({ userCookieString });
  // console.log({ userCookie });
  return (
    <header className="w-full bg-[var(--color-primary)] h-16 text-[var(--color-secondary)] px-6 flex items-center justify-between fixed top-0 overflow-hidden z-50">
      <h5 className="ms-0 sm:ms-8">SecretQR</h5>

      <div
        id="options"
        className="row items-center h-full justify-center sm:flex hidden"
      >
        <HeaderItem href="#">Generate</HeaderItem>
        <HeaderItem href="/scanww">Scan</HeaderItem>
        <HeaderItem href="/history">History</HeaderItem>
        <ProfileButton user={userCookie.user} />
      </div>

      <div
        id="menu-icon"
        className="row items-center h-full justify-center sm:hidden block"
      >
        <HeaderItem href="#">Menu</HeaderItem>
      </div>
    </header>
  );
}
