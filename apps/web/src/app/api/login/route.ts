import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();
  if (!idToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "session",
    value: idToken,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  return response;
}
