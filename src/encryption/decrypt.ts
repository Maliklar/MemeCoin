import crypto from "crypto";
export default function decrypt(data: string, privateKey: string) {
  const decryptedData = crypto.privateDecrypt(privateKey, data);
  return decryptedData;
}
