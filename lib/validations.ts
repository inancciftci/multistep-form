import { z } from "zod";

export const PersonalInfoSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
});

export const SelectPlanSchema = z.object({
  plan: z.string().nonempty({ message: "Please select a plan" }),
  subscription: z
    .string()
    .nonempty({ message: "Please select a subscription model" }),
});

export const AddOnSchema = z.object({
  addons: z
    .array(z.string())
    .nonempty({ message: "Please select at least one addon" }),
});

export const formSchema =
  PersonalInfoSchema.merge(SelectPlanSchema).merge(AddOnSchema);
