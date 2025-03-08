"use client";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "@/lib/validations";

type FormData = z.infer<typeof formSchema>;

const StepThree = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();
  const subscription = watch("subscription");
  const addons = watch("addons") || [];

  const addonOptions = [
    {
      id: "online-service",
      title: "Online service",
      description: "Access to multiplayer games",
      priceMonthly: 1,
      priceYearly: 10,
    },
    {
      id: "larger-storage",
      title: "Larger storage",
      description: "Extra 1TB of cloud save",
      priceMonthly: 2,
      priceYearly: 20,
    },
    {
      id: "customizable-profile",
      title: "Customizable profile",
      description: "Custom theme on your profile",
      priceMonthly: 2,
      priceYearly: 20,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-100">Pick add-ons</h2>
        <p className="text-neutral-100 mt-5">
          Add-ons help enhance your gaming experience.
        </p>
      </div>

      {errors.addons && (
        <span className="text-red-500 text-sm">{errors.addons.message}</span>
      )}

      <div className="flex flex-col gap-4">
        {addonOptions.map((addon) => (
          <label
            key={addon.id}
            className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer ${
              addons.includes(addon.id)
                ? "border-primary-100 bg-neutral-100"
                : "border-neutral-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                value={addon.id}
                className="w-5 h-5 accent-primary-100"
                {...register("addons")}
              />
              <div>
                <h3 className="font-bold text-primary-100">{addon.title}</h3>
                <p
                  className={`text-sm text-neutral-100 ${
                    addons.includes(addon.id) && "text-white"
                  }`}
                >
                  {addon.description}
                </p>
              </div>
            </div>
            <span className="text-sm text-primary-300">
              {subscription === "yearly"
                ? `+$${addon.priceYearly}/yr`
                : `+$${addon.priceMonthly}/mo`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StepThree;
