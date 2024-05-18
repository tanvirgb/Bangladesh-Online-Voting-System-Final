import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    const { issue, email } = req.body;

    console.log("New issue reported:");
    console.log(`Issue: ${issue}`);
    console.log(`Email: ${email}`);
  }

  return NextResponse.json("Reported issue successfully");
}
