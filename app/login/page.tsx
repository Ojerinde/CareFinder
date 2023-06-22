/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Form, { showToastMessage } from "./loginForm";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { AiFillTwitterCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AppContext } from "@/store/AppContext";
import classes from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const { updateLoggedInState } = useContext(AppContext);

  const loginHandler = async () => {
    try {
      await signIn("google");
    } catch (error: any) {
      showToastMessage("error", error.message);
    }
  };

  // Authethication check
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      updateLoggedInState({ isLoggedIn: true, email: session?.user?.email });
      router.push("/home ");
    }
  }, [session]);

  return (
    <>
      <div className={classes.login} id="login__page">
        <h1 className={classes.h1}>Securely log in to manage your health!</h1>
        <Form />

        <p className={classes.p}>
          Do not have an account?
          <Link href="/signup" className={classes.a}>
            Create now
          </Link>
        </p>
        <div className="w-full my-6 text-primary_color text-center text-[2.3rem] tracking-wider font-normal">
          Or sign in with
        </div>
        <div id="icons" className={classes.icons}>
          <FcGoogle onClick={loginHandler} />
        </div>
      </div>
    </>
  );
};

export default Login;
