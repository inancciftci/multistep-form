"use client";
import StepFour from "@/components/formsteps/StepFour";
import StepOne from "@/components/formsteps/StepOne";
import StepThree from "@/components/formsteps/StepThree";
import StepTwo from "@/components/formsteps/StepTwo";
import { useState } from "react";

const steps = [
  { id: 1, title: "Your Info", description: "Your Info" },
  { id: 2, title: "Select plan", description: "Select plan" },
  { id: 3, title: "Add-ons", description: "Add-ons" },
  { id: 4, title: "Summary", description: "Summary" },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    if (currentStep < steps.length) {
      const form = document.querySelector(".form");
      form?.classList.add("form-step");
      sleep(500).then(() => {
        setCurrentStep(currentStep + 1);
        form?.classList.remove("form-step");
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const form = document.querySelector(".form");
      form?.classList.add("form-step");
      sleep(500).then(() => {
        setCurrentStep(currentStep - 1);
        form?.classList.remove("form-step");
      });
    }
  };
  return (
    <div className="bg-white w-[80%] rounded-xl p-3 max-w-[960px] h-[80vh]">
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
        <div className="px-10 pt-10 pb-2 flex flex-col justify-between form">
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour />}
          <div
            className={`flex items-center justify-between ${
              currentStep === 1 && "justify-end"
            }`}
          >
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="bg-primary-100 cursor-pointer text-sm font-[500] text-white w-[150px] text-center py-2 rounded-lg"
              >
                Previous Step
              </button>
            )}
            {currentStep < steps.length && (
              <button
                onClick={nextStep}
                className="bg-primary-100 cursor-pointer text-sm font-[500] text-white w-[150px] py-2 rounded-lg"
              >
                Next Step
              </button>
            )}
            {currentStep === steps.length && (
              <button
                onClick={() => alert("Submitted")}
                className="bg-primary-100 cursor-pointer text-sm font-[500] text-white w-[150px] py-2 rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
