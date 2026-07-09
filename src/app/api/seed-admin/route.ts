import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await prisma.admin.upsert({
      where: { email: "admin@maajfurniture.com" },
      update: {},
      create: {
        name: "Admin",
        email: "admin@maajfurniture.com",
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      email: admin.email,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
