"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { toast } from "react-toast";

export const AuthSocialButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = () => {
    setIsLoading(true);
    signIn("github", {
      redirect: false,
    })
      .then((resp) => {
        if (resp?.error) {
          console.log(`ERROR SIGN IN ${resp.error}`);
          toast.error("Sorry, something went wrong!");
        }
        if (!resp?.error && resp?.ok) {
          toast.success("Sign In Successfully!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <button
      type="button"
      onClick={login}
      disabled={isLoading}
      className={
        isLoading
          ? "items-center mt-5 flex w-48 justify-center rounded-md bg-white px-5 py-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:outline-offset-0"
          : "items-center mt-5 flex w-48 justify-center bg-blue-300 rounded-md shadow-sm px-5 py-4 text-white -sm ring-1 ring-inset ring-blue-500 hover:bg-blue-600 focus:outline-offset-0"
      }
    >
      <BsGithub />
    </button>
  );
};
