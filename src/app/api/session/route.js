import {
  createSession,
  decrypt,
  deleteSession,
  updateSession,
} from "@/lib/session";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const session = await decrypt(req.cookies.get("session")?.value);

  return NextResponse.json(session || null);
}

export async function POST(req) {
  const options = await req.json();

  await createSession(options);
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get("session");
  const session = await decrypt(cookieSession?.value);

  return NextResponse.json(session);
}

export async function DELETE(req) {
  await deleteSession();
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get("session");
  const session = await decrypt(cookieSession?.value);

  return NextResponse.json(session || {});
}

export async function PUT(req) {
  const options = await req.json();
  await updateSession(options);

  const cookieStore = await cookies();
  const cookieSession = cookieStore.get("session");
  const session = await decrypt(cookieSession?.value);

  return NextResponse.json(session);
}
