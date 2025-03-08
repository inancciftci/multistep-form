"use client";
import StepFour from "@/components/formsteps/StepFour";
import StepOne from "@/components/formsteps/StepOne";
import StepThree from "@/components/formsteps/StepThree";
import StepTwo from "@/components/formsteps/StepTwo";
import { formSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const steps = [
  { id: 1, title: "Your Info", description: "Your Info" },
  { id: 2, title: "Select plan", description: "Select plan" },
  { id: 3, title: "Add-ons", description: "Add-ons" },
  { id: 4, title: "Summary", description: "Summary" },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "",
      subscription: "",
      addons: [],
    },
  });

  const { trigger, handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully check console for the data");
  };

  const nextStep = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await trigger(["name", "email", "phone"]);
    }
    if (currentStep === 2) {
      isValid = await trigger(["plan", "subscription"]);
    }
    if (currentStep === 3) {
      isValid = await trigger(["addons"]);
    }

    if (isValid && currentStep < steps.length) {
      const form = document.querySelector(".form");
      form?.classList.add("form-step");
      const formMain = document.querySelector(".form-main");
      formMain?.classList.add("form-main-effect-next");
      sleep(500).then(() => {
        setCurrentStep(currentStep + 1);
        form?.classList.remove("form-step");
        formMain?.classList.remove("form-main-effect-next");
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const form = document.querySelector(".form");
      form?.classList.add("form-step");
      const formMain = document.querySelector(".form-main");
      formMain?.classList.add("form-main-effect-prev");
      sleep(500).then(() => {
        setCurrentStep(currentStep - 1);
        form?.classList.remove("form-step");
        formMain?.classList.remove("form-main-effect-prev");
      });
    }
  };
  return (
    <div className="bg-white form-main w-[80%] shadow-primary-100 shadow-lg rounded-xl p-3 max-w-[960px] h-[80vh]">
      <div className="grid grid-cols-[300px_1fr] h-full">
        <div className="h-[100%] p-10 rounded-lg bg-[url(/bg-sidebar-desktop.svg)] bg-no-repeat bg-cover bg-center">
          <div className="flex flex-col gap-10">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={`w-[35px] h-[35px] font-bold border-[1px] border-white  rounded-full flex items-center justify-center transition-[background_color] duration-[1s] ${
                    currentStep === step.id
                      ? "bg-primary-300 text-primary-100"
                      : "text-neutral-500"
                  }`}
                >
                  {step.id}
                </div>
                <div className="flex flex-col justify-between">
                  <span className="uppercase text-primary-300 text-sm">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-bold uppercase text-neutral-500">
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-10 pt-10 pb-2 flex-grow form">
              {currentStep === 1 && <StepOne />}
              {currentStep === 2 && <StepTwo />}
              {currentStep === 3 && <StepThree />}
              {currentStep === 4 && <StepFour />}
            </div>
            <div
              className={`px-10 flex items-center justify-between ${
                currentStep === 1 && "justify-end"
              }`}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className=" cursor-pointer text-sm font-[500] text-primary-100 w-[150px] text-center py-2 rounded-lg"
                >
                  Go Back
                </button>
              )}
              {currentStep < steps.length && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-100 cursor-pointer text-sm font-[500] text-white w-[150px] py-2 rounded-lg"
                >
                  Next Step
                </button>
              )}
              {currentStep === steps.length && (
                <button
                  type="submit"
                  className="bg-primary-100 cursor-pointer text-sm font-[500] text-white w-[150px] py-2 rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
