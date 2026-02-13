import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AuthUserPayload, getAuthUser } from "@/lib/auth-guard";
import { getAllUsers } from "@/services/user.service";

export async function GET(req: Request) {
  await connectDB();

  const user = await getAuthUser(req);

<<<<<<< HEAD
  if (!user || (String((user as AuthUserPayload).role).toLowerCase() !== "admin")) {
=======
  if (!user || (user as AuthUserPayload).role !== "admin") {
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const users = await getAllUsers();

  return NextResponse.json(users);
}
