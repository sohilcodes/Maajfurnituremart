import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const output = execSync("npx prisma db push --accept-data-loss", {
      encoding: "utf-8",
    });
    return NextResponse.json({ success: true, output });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
