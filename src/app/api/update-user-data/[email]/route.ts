import connectToDatabase from "@/library/database/db";
import User from "@/library/modals/User";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await connectToDatabase(); 
    const { email } = await params;
    const updateData = await req.json(); 

   
    if (!email) {
      return NextResponse.json({ message: "Email parameter is required" }, { status: 400 });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
