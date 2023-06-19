/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Form, { showToastMessage } from "./loginForm";
import classes from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AppContext } from "@/store/AppContext";

const Login = () => {
  const router = useRouter();
  const { isLoggedIn, updateLoggedInState } = useContext(AppContext);

  const googleHandler = async () => {
    try {
      await signIn("google");
    } catch (error: any) {
      showToastMessage("error", error.message);
    }
  };
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      updateLoggedInState({ isLoggedIn: true, email: session?.user?.email });
      console.log("updated", isLoggedIn);

      if (isLoggedIn.isLoggedIn) {
        console.log("redirec", isLoggedIn);

        router.push("/home ");
      }
    }
  }, [session, isLoggedIn]);

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
        <div id="icons" className={classes.icons}>
          <FcGoogle onClick={googleHandler} />
        </div>
      </div>
    </>
  );
};

export default Login;
