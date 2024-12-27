import crypto from "crypto";
export default async function encrypt(data: string) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  console.log("Encrypted Data:", encryptedData.toString("base64"));

  return {
    data,
    publicKey,
    privateKey,
  };
}
