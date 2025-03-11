import connectToDatabase from "@/library/database/db";
import Hospital from "@/library/modals/HospitalSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const id = (await params).id

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return NextResponse.json(
        {
          success: false,
          message: "Hospital not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hospital found successfully",
        data: hospital,
      },
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
