import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = [
      { name: "Sofa", slug: "sofa" },
      { name: "Bed", slug: "bed" },
      { name: "Dining", slug: "dining" },
      { name: "Chair", slug: "chair" },
      { name: "Office", slug: "office" },
      { name: "Wardrobe", slug: "wardrobe" },
      { name: "TV Unit", slug: "tv-unit" },
      { name: "Coffee Table", slug: "coffee-table" },
      { name: "Mattress", slug: "mattress" },
    ];

    for (const [index, cat] of categories.entries()) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: { ...cat, order: index },
      });
    }

    await prisma.siteSettings.upsert({
      where: { id: "1" },
      update: {},
      create: {},
    });

    return NextResponse.json({
      success: true,
      message: "Categories seeded successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
