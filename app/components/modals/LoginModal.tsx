"use client";

import Modal from "./Modal";
import Input from "../inputs/Input";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleOnChange = (open: boolean) => {
    if (!open) {
      loginModal.onClose();
    }
  };

  const handleModal = useCallback(() => {
    if (loginModal.isOpen) {
      loginModal.onClose();
      registerModal.onOpen();
    } else {
      loginModal.onOpen();
      registerModal.onClose();
    }
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    setIsLoading(true);
    signIn("credentials", {
      ...value,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);
        console.log("CALLBACK SIGN IN", callback);
        if (callback?.error) {
          toast.error("Something went wrong");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Succesfully Sign In!");
          loginModal.onClose();
          reset();
        }
      })
      .catch((e) => console.log(`ERROR FROM SIGN IN ${e}`));
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onChange={handleOnChange}
      title="Welcome Back!"
    >
      <div className="flex flex-col">
        <p className="text-neutral-400 font-light text-sm leading-normal">
          Login to add your todo!
        </p>
        <Input
          disabled={isLoading}
          label="Email"
          placeholder="Add your email"
          {...register("email", { required: true })}
        />
        <Input
          disabled={isLoading}
          label="Password"
          placeholder="Add your password"
          type="password"
          {...register("password", { required: true })}
        />
        <div className="mt-1 mb-2">
          <p
            onClick={handleModal}
            className="text-lg font-medium text-neutral-800 hover:text-neutral-500 cursor-pointer"
          >
            Create an account
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={
            !isLoading
              ? "mt-4 bg-purple-500 px-5 py-2 shadow-lg shadow-purple-300 rounded-md text-white font-semibold text-lg"
              : "mt-4 bg-gray-400 px-5 py-2 shadow-lg rounded-md text-white font-semibold text-lg cursor-none"
          }
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
