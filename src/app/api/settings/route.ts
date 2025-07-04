import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import SettingModel from "@/models/Settings.model";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const seasson = await auth();

    if (!seasson) {
      return NextResponse.json(
        { message: "Unoutirised access" },
        { status: 401 }
      );
    }
    const { logo, signature } = await request.json();
    await connectDB();

    const setting = await SettingModel.findOne({ userId: seasson.user.id });

    const payload = {
      userId: seasson.user.id,
      ...(logo && { invoicelogo: logo }),
      ...(signature && { signature: signature }),
    };
    if (setting) {
      const updateSetting = await SettingModel.findByIdAndUpdate(
        setting._id,
        payload
      );
      return NextResponse.json({ message: "setting updated succesfully" });
    }
    const createSetting = await SettingModel.create(payload);

    return NextResponse.json({ message: "Setting updated succesfully" });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const seasson = await auth();

    if (!seasson) {
      return NextResponse.json(
        { message: "Unoutorised access" },
        { status: 401 }
      );
    }
    const getData = await SettingModel.findOne({ userId: seasson.user.id });
    return NextResponse.json({ message: "success", data: getData });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "something went wrong",
      },
      { status: 500 }
    );
  }
}
