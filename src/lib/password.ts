import bcrypt from "bcryptjs";

export async function hashPassword(pw: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(pw, salt);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(pw, hash);
}
