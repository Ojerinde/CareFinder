"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../UI/Button/Button";
import CustomNavLink from "../../UI/CustomNavLink";
import classes from "./LandingHeader.module.css";
import Link from "next/link";
const LandingNavigation: React.FC = () => {
  const router = useRouter();
  return (
    <header className={classes.header} id="header">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="cursor-pointer"
        />
      </Link>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <CustomNavLink exact href={{ pathname: "/" }}>
            Home
          </CustomNavLink>
        </li>{" "}
        <li className={classes.li}>
          <CustomNavLink exact href={{ pathname: "/about" }}>
            About
          </CustomNavLink>
        </li>{" "}
        <li className={classes.li}>
          <CustomNavLink exact href={{ pathname: "/hospitals" }}>
            Search
          </CustomNavLink>
        </li>
      </ul>
      <nav className={classes.nav}>
        <Button
          type="button"
          className={classes.header__button}
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          type="button"
          className={classes.header__button}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </Button>
      </nav>
    </header>
  );
};
export default LandingNavigation;
