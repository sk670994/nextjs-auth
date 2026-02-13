import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AuthUserPayload, getAuthUser } from "@/lib/auth-guard";
import { getAllUsers } from "@/services/user.service";

export async function GET(req: Request) {
  await connectDB();

  const user = await getAuthUser(req);

  if (!user || String((user as AuthUserPayload).role).toLowerCase() !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const users = await getAllUsers();

  return NextResponse.json(users);
}
