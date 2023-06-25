"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
  // Getting the signedin user email
  const { data: session } = useSession();
  const email = session?.user?.email;
  return (
    <section className="flex items-center justify-between w-[60%] mt-24 mx-auto max-lg:flex-col">
      <div className="basis-[45%] bg-secondary_light_color max-lg:mb-4">
        <Image
          src="/images/profile.png"
          alt={email || ""}
          width={1000}
          height={300}
        />
      </div>
      <div className="basis-[45%]">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-4xl font-normal mb-8">
            Email:
          </label>
          <input
            className="text-4xl font-bold mb-2 border rounded border-primary_light_color py-4 px-8"
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
