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
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

/*

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body.data;

    const findEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      throw new NextResponse("Invalid Email", {
        status: 401,
        statusText: "Email already used!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.data.password, salt);

    const user = await prisma.user.create({
      data: {
        createdAt: body.data.createdAt,
        email: email,
        emailVerified: email,
        hashedPassword: hashedPassword,
        image: "",
        name: name,
        updatedAt: null,
      },
    });

    await prisma.user.findMany({
      include: {
        todos: true,
      },
    });

    if (!user) {
      throw new NextResponse("Failed Create User", {
        status: 401,
      });
    }

    return NextResponse.json(user, {
      status: 200,
      statusText: "User Successfully Created!",
    });
  } catch (error) {
    console.log("ERROR REGISTER USER ROUTE", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

*/
