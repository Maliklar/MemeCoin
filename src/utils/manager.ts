import { readFileSync, writeFileSync } from "fs";
import { blocksPath } from "../ENV";
import Block from "../dto/Block";
import jwt from "jsonwebtoken";
export async function writeBlock(block: Block) {
  const blocks = readFileSync(`${blocksPath}/blocks.json`, {
    encoding: "utf-8",
  });

  return writeFileSync(`${blocksPath}/${block.input}.json`, block.serialize());
}

export function signBlock(data: Block, secret: string) {
  return jwt.sign(data.serialize(), secret);
}

export function signData(data: string | Buffer | object, secret: string) {
  return jwt.sign(data, secret);
}
