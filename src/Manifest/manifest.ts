import crypto, { BinaryLike } from "crypto";
import isPrime from "./isPrime";

/**
 * @author Malik Elbadri
 * @description This file should not be changed
 */

export const HASH_FUNCTION = "MD5";

const WORD = 4;
export const HASH_SIZE = 64 / WORD; // Bits

export function createHash(input: BinaryLike) {
  const hashValue = crypto
    .createHash(HASH_FUNCTION)
    .update(input)
    .digest("hex")
    .substring(0, HASH_SIZE);
  return BigInt("0x" + hashValue);
}

const firstBlocks = [
  16939742312153078021n,
  17913370561998816659n,
  9415420481375052563n,
];
export function hashCheck(input: BinaryLike) {
  const hash = createHash(input);
  if (firstBlocks.includes(hash)) return { hash, isPrime: true };
  return { hash, isPrime: isPrime(hash) };
}
