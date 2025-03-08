"use client";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "@/lib/validations";

type FormData = z.infer<typeof formSchema>;

const StepFour = () => {
  const { watch } = useFormContext<FormData>();
  const { plan, subscription, addons } = watch();

  const planPrices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 },
  };

  const addonPrices = {
    "online-service": { monthly: 1, yearly: 10 },
    "larger-storage": { monthly: 2, yearly: 20 },
    "customizable-profile": { monthly: 2, yearly: 20 },
  };

  const planPrice =
    planPrices[plan as keyof typeof planPrices]?.[
      subscription as keyof (typeof planPrices)["arcade"]
    ] || 0;

  const addonsTotalPrice = (addons || []).reduce((total, addon) => {
    return (
      total +
      (addonPrices[addon as keyof typeof addonPrices]?.[
        subscription as keyof (typeof addonPrices)["online-service"]
      ] || 0)
    );
  }, 0);

  const totalPrice = planPrice + addonsTotalPrice;

  const addonNames = {
    "online-service": "Online service",
    "larger-storage": "Larger storage",
    "customizable-profile": "Customizable profile",
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-100">Finishing up</h2>
        <p className="text-neutral-100 mt-5">
          Double-check everything looks OK before confirming.
        </p>
      </div>

      <div className="bg-neutral-100 rounded-lg p-5">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <h3 className="font-bold text-primary-100 capitalize">
              {plan} ({subscription})
            </h3>
          </div>
          <span className="font-bold text-primary-100">
            ${planPrice}/{subscription === "yearly" ? "yr" : "mo"}
          </span>
        </div>

        {addons && addons.length > 0 && (
          <div className="mt-4 space-y-3">
            {addons.map((addon) => (
              <div key={addon} className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">
                  {addonNames[addon as keyof typeof addonNames]}
                </span>
                <span className="text-sm text-primary-100">
                  +$
                  {
                    addonPrices[addon as keyof typeof addonPrices][
                      subscription as keyof (typeof addonPrices)["online-service"]
                    ]
                  }
                  /{subscription === "yearly" ? "yr" : "mo"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5">
        <span className="text-sm text-neutral-100">
          Total (per {subscription === "yearly" ? "year" : "month"})
        </span>
        <span className="font-bold text-lg text-primary-100">
          ${totalPrice}/{subscription === "yearly" ? "yr" : "mo"}
        </span>
      </div>
    </div>
  );
};

export default StepFour;
