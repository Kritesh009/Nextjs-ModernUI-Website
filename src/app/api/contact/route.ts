import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  return NextResponse.json({
    success: true,
    message: "Message sent successfully",
  });
}