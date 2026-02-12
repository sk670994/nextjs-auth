import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AuthUserPayload, getAuthUser } from "@/lib/auth-guard";
import {
  updateUserByAdmin,
  deleteUserByAdmin,
} from "@/services/user.service";

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user || (user as AuthUserPayload).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = context.params;
  const data = (await req.json()) as Record<string, unknown>;

  const updated = await updateUserByAdmin(id, data);

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user || (user as AuthUserPayload).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = context.params;

  await deleteUserByAdmin(id);

  return NextResponse.json({ message: "Deleted successfully" });
}
