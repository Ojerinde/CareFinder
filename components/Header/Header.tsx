"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineAdd, MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import React, { useContext } from "react";
import { AppContext } from "@/store/AppContext";
import { signOut, useSession } from "next-auth/react";
import Button from "../UI/Button/Button";

const Header: React.FC = () => {
  const router = useRouter();
  const { updateLoggedInState } = useContext(AppContext);

  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    updateLoggedInState({ email: "", isLoggedIn: false });
    router.push("/");
  };

  const goToHome = () => {
    router.push("/home");
  };

  return (
    <header className="header" id="home__header">
      <div className="" onClick={goToHome} id="header__logo">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="cursor-pointer"
        />
      </div>
      <nav className="flex items-center">
        <div
          id="header__add"
          className="header__icon"
          onClick={() => router.push("/home/addHospital")}
        >
          <MdOutlineAdd />
        </div>
        <div
          id="header__profile"
          className="mx-8 header__icon"
          onClick={() => router.push("/home/profile")}
        >
          <MdAccountCircle />
        </div>
        <div className="ml-8">
          {session ? (
            <Button type="button" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
