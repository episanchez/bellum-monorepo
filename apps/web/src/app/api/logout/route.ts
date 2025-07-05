import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "session",
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/"
  });
  return response;
}
