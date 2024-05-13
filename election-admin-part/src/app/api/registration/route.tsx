import { connectionStr } from "@/app/lib/db";
import { electionAdminSchema } from "@/app/lib/electionAdminsModel";
import mongoose, { ConnectOptions } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
  } as ConnectOptions);
  const data = await electionAdminSchema.find();
  console.log(data);

  return NextResponse.json({ result: data });
}
