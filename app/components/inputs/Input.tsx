"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      id,
      placeholder,
      disabled,
      type = "text",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mt-2">
        {label && (
          <label className="text-neutral-600 text-right text-lg font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className="mt-1 text-neutral-500 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
          {...props}
        ></input>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
