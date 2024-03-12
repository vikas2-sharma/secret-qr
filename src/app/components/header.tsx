import HeaderItem from "./ui/headerItem";

export default function Header() {
  return (
    <header className="w-full bg-[var(--color-primary)] h-16 text-[var(--color-secondary)] px-6 flex items-center justify-between fixed top-0 overflow-hidden z-50">
      <h5 className="ms-0 sm:ms-8">SecretQR</h5>

      <div
        id="options"
        className="row items-center h-full justify-center sm:flex hidden"
      >
        <HeaderItem href="#">Generate</HeaderItem>
        <HeaderItem href="#">Scan</HeaderItem>
        <HeaderItem href="#">History</HeaderItem>
        <HeaderItem href="/home/login" type="button">
          Login
        </HeaderItem>
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
