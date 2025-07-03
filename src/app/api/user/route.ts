import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { firstName, lastName, currency } = await request.json();
    const seasson = await auth();

    if (!seasson) {
      return NextResponse.json(
        { message: "Unautorised access" },
        { status: 401 }
      );
    }
    await connectDB();
    const userDetails = await UserModel.findByIdAndUpdate(seasson.user?.id, {
      firstName,
      lastName,
      currency,
    });

    return NextResponse.json({
      message: "User updated successfully",
      // data: userDetails,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
