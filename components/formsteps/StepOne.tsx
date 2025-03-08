"use client";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "@/lib/validations";

type FormData = z.infer<typeof formSchema>;

const StepOne = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="flex flex-col h-full gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-100">Personal Info</h2>
        <p className="text-neutral-100 mt-5">
          Please provide your name, email address, and phone number.
        </p>
      </div>

      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="name" className="text-sm text-primary-100">
              Name
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <input
            id="name"
            type="text"
            placeholder="e.g. Stephen King"
            className={`border rounded-md py-2 px-4 focus:outline-none ${
              errors.name
                ? "border-red-500"
                : "border-neutral-200 focus:border-primary-100"
            }`}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="email" className="text-sm text-primary-100">
              Email Address
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <input
            id="email"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            className={`border rounded-md py-2 px-4 focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-neutral-200 focus:border-primary-100"
            }`}
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="phone" className="text-sm text-primary-100">
              Phone Number
            </label>
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            className={`border rounded-md py-2 px-4 focus:outline-none ${
              errors.phone
                ? "border-red-500"
                : "border-neutral-200 focus:border-primary-100"
            }`}
            {...register("phone")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
