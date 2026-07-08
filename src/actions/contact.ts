"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Naam kam se kam 2 characters ka hona chahiye"),
  phone: z.string().min(10, "Valid phone number daalein"),
  message: z.string().min(5, "Message kam se kam 5 characters ka hona chahiye"),
  productId: z.string().optional(),
});

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
    productId: (formData.get("productId") as string) || undefined,
  };

  const validated = contactSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.errors[0].message,
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: validated.data,
    });

    return {
      success: true,
      message: "Aapka message successfully bhej diya gaya hai! Hum jaldi hi contact karenge.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Kuch galat ho gaya. Kripya phir se try karein.",
    };
  }
}
