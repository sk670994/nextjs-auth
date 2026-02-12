import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AuthUserPayload, getAuthUser } from "@/lib/auth-guard";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "@/services/user.service";

export async function GET(req: Request) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile((user as AuthUserPayload).id);

  return NextResponse.json({ user: profile });
}

export async function PUT(req: Request) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Record<string, unknown>;

  const updated = await updateProfile((user as AuthUserPayload).id, body);

  return NextResponse.json({ user: updated });
}

export async function DELETE(req: Request) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await deleteProfile((user as AuthUserPayload).id);

  return NextResponse.json({ message: "Profile deleted" });
}
