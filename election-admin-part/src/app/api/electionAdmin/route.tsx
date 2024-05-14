import { connectionStr } from "@/app/lib/db";
import { electionAdminSchema } from "@/app/lib/electionAdminsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  const data = await electionAdminSchema.find();
  console.log(data);

  return NextResponse.json({ result: data });
}

export async function POST(request: any) {
  let payload = await request.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr);

  if (payload.login) {
    result = await electionAdminSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    const electionAdmin = new electionAdminSchema(payload);
    result = await electionAdmin.save();
    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
