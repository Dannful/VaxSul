import crypto from "crypto";

export async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = crypto
    .createHash("sha256")
    .update(msgBuffer)
    .digest("hex");
  return hashBuffer;
}
