import { JWTPayload, jwtVerify } from "jose";

export interface AuthUserPayload extends JWTPayload {
  id: string;
  role: string;
}

export async function getAuthUser(
  req: Request
): Promise<AuthUserPayload | null> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify<AuthUserPayload>(token, secret);

    return payload;
  } catch {
    return null;
  }
}
