import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  href: { pathname: string; query?: { track: string } };
  exact?: Boolean;
  children?: React.ReactNode;
  className?: "active__nav" | "" | undefined;
}

const CustomNavLink: React.FC<Props> = ({
  href,
  exact,
  children,
  ...others
}) => {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href?.pathname
    : pathname?.startsWith(href.pathname);

  if (isActive) {
    others.className = "active__nav";
  }
  return (
    <Link href={href} {...others} legacyBehavior>
      {children}
    </Link>
  );
};
export default CustomNavLink;
