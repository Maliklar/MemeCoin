import { writeFileSync } from "fs";
import jwt from "jsonwebtoken";
import { blocksPath, secretKey } from "../ENV";
import Block from "../dto/Block";
export async function writeBlock(block: Block) {
  return writeFileSync(`${blocksPath}/blocks.blk`, "\n" + signBlock(block), {
    flag: "a",
  });
}

export function signBlock(data: Block) {
  return jwt.sign(data.serialize(), secretKey);
}

export function signData(data: string | Buffer | object) {
  return jwt.sign(data, secretKey);
}
