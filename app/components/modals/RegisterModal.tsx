"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import React, { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();

  const handleOnChange = (open: boolean) => {
    if (!open) {
      registerModal.onClose();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      fullName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    const createdAt = new Date(Date.now());
    setIsLoading(true);
    axios
      .post("/api/user/register", {
        data: {
          password: value.password,
          createdAt: createdAt,
          emailVerified: value.email,
          name: value.name,
          email: value.email,
        },
      })
      .then((resp) => {
        console.log("SUCCESS CREATED USER", resp);
        toast.success("Success create user!");
        registerModal.onClose();
        reset();
      })
      .catch((e) => {
        console.log("ERROR CREATE USER", e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onChange={handleOnChange}
      title="Register"
    >
      <div className="flex flex-col">
        <p className="text-neutral-400 font-light text-sm leading-normal">
          Register first to add your todo!
        </p>
        <Input
          label="Name"
          placeholder="Add your name"
          {...register("name", { required: true })}
        />
        <Input
          label="Full Name"
          placeholder="Add your full name"
          {...register("fullName", { required: true })}
        />
        <Input
          label="Email"
          placeholder="Add your email"
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          placeholder="Add your password"
          type="password"
          {...register("password", { required: true })}
        />
        <button
          onClick={handleSubmit(onSubmit)}
          className={
            !isLoading
              ? "mt-4 bg-purple-500 px-5 py-2 shadow-lg shadow-purple-300 rounded-md text-white font-semibold text-lg"
              : "mt-4 bg-gray-400 px-5 py-2 shadow-lg rounded-md text-white font-semibold text-lg cursor-none"
          }
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
    </Modal>
  );
};

export default RegisterModal;
