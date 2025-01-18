import crypto, { BinaryLike } from "crypto";
import isPrime from "./isPrime";

/**
 * @author Malik Elbadri
 * @description This file should not be changed
 */

export const HASH_FUNCTION = "MD5";

export const HASH_SIZE = 64; // Bits

export function createHash(input: BinaryLike) {
  const hashValue = crypto
    .createHash(HASH_FUNCTION)
    .update(input)
    .digest("hex")
    .substring(0, 8);
  return BigInt("0x" + hashValue);
}

export function hashCheck(input: BinaryLike) {
  const hash = createHash(input);
  return { hash, isPrime: isPrime(hash) };
}
