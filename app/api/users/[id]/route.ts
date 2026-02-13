import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AuthUserPayload, getAuthUser } from "@/lib/auth-guard";
import {
  updateUserByAdmin,
  deleteUserByAdmin,
} from "@/services/user.service";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getAuthUser(req);

<<<<<<< HEAD
  if (!user || (String((user as AuthUserPayload).role).toLowerCase() !== "admin")) {
=======
  if (!user || (user as AuthUserPayload).role !== "admin") {
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  const data = (await req.json()) as Record<string, unknown>;

  const updated = await updateUserByAdmin(id, data);

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getAuthUser(req);

<<<<<<< HEAD
  if (!user || (String((user as AuthUserPayload).role).toLowerCase() !== "admin")) {
=======
  if (!user || (user as AuthUserPayload).role !== "admin") {
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;

  await deleteUserByAdmin(id);

  return NextResponse.json({ message: "Deleted successfully" });
}
