"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  return (
    <section className="flex items-center justify-center">
      <div className="w-[50%] mt-16 mx-auto">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-4xl font-normal mb-8">
            Email:
          </label>
          <input
            className="text-4xl font-bold mb-2"
            type="text"
            placeholder={email || ""}
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
