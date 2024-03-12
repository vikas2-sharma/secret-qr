import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type headerItemType = "link" | "button";
function HeaderItem({
  children,
  href,
  as,
  type = "link",
}: {
  children: React.ReactNode;
  href: string;
  as?: string;
  type?: headerItemType;
}) {
  return type == "link" ? (
    <Link
      href={href}
      as={as}
      className="h-full grid place-items-center hover:bg-color-primary-hover hover:text-color-secondary-hover"
    >
      <div className="px-4 p-0">{children}</div>
    </Link>
  ) : (
    <div className="h-full grid place-items-center mx1">
      <Link
        href={href}
        as={as}
        className="px-8 bg-color-tertiary text-color-primary rounded py-2 hover:text-color-primary hover:bg-color-tertiary-hover p-0  "
      >
        {children}
      </Link>
    </div>
  );
}
export default HeaderItem;
