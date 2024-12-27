import { generateKeyPairSync } from "crypto";
export default async function encrypt(message: string) {
  const keyPair = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });
  console.log(keyPair);
}
