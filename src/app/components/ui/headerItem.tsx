type headerItemType = "link" | "button";
function HeaderItem({
  children,
  href,
  type = "link",
}: {
  children: React.ReactNode;
  href?: string;
  type?: headerItemType;
}) {
  return type == "link" ? (
    <a
      href={href}
      className="h-full grid place-items-center hover:bg-color-primary-hover hover:text-color-secondary-hover"
    >
      <div className="px-4 p-0">{children}</div>
    </a>
  ) : (
    <div className="h-full grid place-items-center mx1">
      <a
        href={href}
        className="px-8 bg-color-tertiary text-color-primary rounded py-2 hover:text-color-primary hover:bg-color-tertiary-hover p-0  "
      >
        {children}
      </a>
    </div>
  );
}
export default HeaderItem;
