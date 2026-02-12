import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-guard";
import {
  updateUserByAdmin,
  deleteUserByAdmin,
} from "@/services/user.service";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user || (user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params; // 👈 important change
  const data = await req.json();

  const updated = await updateUserByAdmin(id, data);

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user || (user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;

  await deleteUserByAdmin(id);

  return NextResponse.json({ message: "Deleted successfully" });
}
