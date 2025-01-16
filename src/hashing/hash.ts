import crypto from "crypto";

export default function hash(value: Buffer) {
  const hashValue = crypto
    .createHash("sha-256", { encoding: "hex" })
    .update(value)
    .digest("hex");
  console.log();
  return Number("0x" + hashValue).toString(2);
}
