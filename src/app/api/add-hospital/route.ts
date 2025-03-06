import connectToDatabase from "@/library/database/db";
import Hospital from "@/library/modals/HospitalSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const payload = await req.json();
    if (!payload.basicDetails?.name || !payload.basicDetails?.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newHospital = new Hospital(payload);
    await newHospital.save();

    return NextResponse.json(
      { message: "Hospital added successfully", hospital: newHospital },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
  }
}
