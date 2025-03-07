import connectToDatabase from "@/library/database/db";
import User from "@/library/modals/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id: userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: user,
      message: "user found successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json(
        { message: "Server error", error: (error as Error).message },
        { status: 500 }
      );
  }
}
