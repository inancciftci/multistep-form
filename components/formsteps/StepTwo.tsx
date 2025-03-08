"use client";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "@/lib/validations";
import Image from "next/image";

type FormData = z.infer<typeof formSchema>;

const StepTwo = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();
  const subscription = watch("subscription");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-100">
          Select your plan
        </h2>
        <p className="text-neutral-100 mt-5">
          You have the option of monthly or yearly billing.
        </p>
      </div>

      {errors.plan && (
        <span className="text-red-500 text-sm">{errors.plan.message}</span>
      )}

      <div className="flex gap-4">
        <label
          className={`flex-1 border rounded-lg p-4 cursor-pointer ${
            watch("plan") === "arcade"
              ? "border-primary-100 bg-neutral-100"
              : "border-neutral-200"
          }`}
        >
          <input
            type="radio"
            value="arcade"
            className="hidden"
            {...register("plan")}
          />
          <div className="flex flex-col gap-12">
            <Image src="/icon-arcade.svg" alt="Arcade" width={35} height={35} />
            <div>
              <h3 className="font-bold text-primary-100">Arcade</h3>
              <p className="text-sm text-black">
                {subscription === "yearly" ? "$90/yr" : "$9/mo"}
              </p>
              {subscription === "yearly" && (
                <p className="text-xs text-primary-100">2 months free</p>
              )}
            </div>
          </div>
        </label>

        <label
          className={`flex-1 border rounded-lg p-4 cursor-pointer ${
            watch("plan") === "advanced"
              ? "border-primary-100 bg-neutral-100"
              : "border-neutral-200"
          }`}
        >
          <input
            type="radio"
            value="advanced"
            className="hidden"
            {...register("plan")}
          />
          <div className="flex flex-col gap-12">
            <Image
              src="/icon-advanced.svg"
              alt="Advanced"
              width={35}
              height={35}
            />
            <div>
              <h3 className="font-bold text-primary-100">Advanced</h3>
              <p className="text-sm text-black">
                {subscription === "yearly" ? "$120/yr" : "$12/mo"}
              </p>
              {subscription === "yearly" && (
                <p className="text-xs text-primary-100">2 months free</p>
              )}
            </div>
          </div>
        </label>

        <label
          className={`flex-1 border rounded-lg p-4 cursor-pointer ${
            watch("plan") === "pro"
              ? "border-primary-100 bg-neutral-100"
              : "border-neutral-200"
          }`}
        >
          <input
            type="radio"
            value="pro"
            className="hidden"
            {...register("plan")}
          />
          <div className="flex flex-col gap-12">
            <Image src="/icon-pro.svg" alt="Pro" height={35} width={35} />
            <div>
              <h3 className="font-bold text-primary-100">Pro</h3>
              <p className="text-sm text-black">
                {subscription === "yearly" ? "$150/yr" : "$15/mo"}
              </p>
              {subscription === "yearly" && (
                <p className="text-xs text-primary-100">2 months free</p>
              )}
            </div>
          </div>
        </label>
      </div>

      {errors.subscription && (
        <span className="text-red-500 text-sm">
          {errors.subscription.message}
        </span>
      )}

      <div className="bg-neutral-100 p-3 rounded-lg flex items-center justify-center gap-6">
        <span
          className={`font-medium ${
            subscription === "monthly" ? "text-primary-100" : "text-neutral-300"
          }`}
        >
          Monthly
        </span>

        <label className="relative inline-flex gap-10 items-center cursor-pointer">
          <input
            type="radio"
            value="monthly"
            className=""
            {...register("subscription")}
          />
          <input
            type="radio"
            value="yearly"
            className=""
            {...register("subscription")}
          />
          {/* <div className="w-11 h-6 bg-primary-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div> */}
        </label>

        <span
          className={`font-medium ${
            subscription === "yearly" ? "text-primary-100" : "text-neutral-300"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
};

export default StepTwo;
