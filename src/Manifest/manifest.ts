import crypto, { BinaryLike } from "crypto";
import isPrime from "./isPrime";

/**
 * @author Malik Elbadri
 * @description This file should not be changed
 */

export const HASH_FUNCTION = "MD5";

export function hash(input: BinaryLike) {
  const hashValue = crypto
    .createHash(HASH_FUNCTION)
    .update(input)
    .digest("hex");
  return BigInt(Number("0x" + hashValue));
}

export function hashCheck(input: BinaryLike) {
  const result = hash(input);
  return isPrime(result);
}
