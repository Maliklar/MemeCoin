import crypto from "crypto";

export default function hash(value: Buffer) {
  const hashValue = crypto
    .createHash("crc64", { encoding: "hex" })
    .update(value)
    .digest("hex");
  return Number("0x" + hashValue).toString(2);
}
