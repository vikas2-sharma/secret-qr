import { cookies, headers } from "next/headers";
import HeaderItem from "./ui/headerItem";
import { VerifyTokenCookie } from "../../../apiutils/definitions";
import ProfileButton from "./ProfileButton";
import { emptyJson, userCookieField } from "../../../apiutils/utils";
import MenuIcon from "./ui/menu/MenuIcon";

export default function Header() {
  const headerList = headers();
  // console.log({ headerList });

  const cookieList = cookies();
  const userCookieString = cookieList.get(userCookieField)?.value || emptyJson;
  let userCookie: VerifyTokenCookie = { user: undefined, token: undefined };
  try {
    userCookie = JSON.parse(userCookieString);
  } catch (e) {}

  return (
    <header className="w-full bg-[var(--color-primary)] h-16 text-[var(--color-secondary)] px-6 flex items-center justify-between fixed top-0 overflow-hidden z-50">
      <h5 className="ms-0 sm:ms-8">SecretQR</h5>

      <div
        id="options"
        className="row items-center h-full justify-center sm:flex hidden"
      >
        <HeaderItem href="/home">Generate</HeaderItem>
        <HeaderItem href="/scan">Scan</HeaderItem>
        <HeaderItem href="/history">History</HeaderItem>
        <ProfileButton user={userCookie.user} />
      </div>

      <div
        id="menu-icon"
        className="row items-center h-full justify-center sm:hidden flex flex-row-reverse"
      >
        <div>
          <MenuIcon color="#fff" />
        </div>
        <div className="mx-4">
          <ProfileButton user={userCookie.user} />
        </div>
      </div>
    </header>
  );
}
