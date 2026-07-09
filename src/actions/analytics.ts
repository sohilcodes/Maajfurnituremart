"use server";

import { prisma } from "@/lib/prisma";

export async function trackPageView(path: string, referrer?: string) {
  try {
    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
      },
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);
  }
}
