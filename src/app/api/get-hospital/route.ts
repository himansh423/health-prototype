import connectToDatabase from "@/library/database/db";
import Hospital from "@/library/modals/HospitalSchema";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {
    await connectToDatabase();
    console.log(req.json())
    const hospitals = await Hospital.find();

    return NextResponse.json(
      { success: true, data: hospitals },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
