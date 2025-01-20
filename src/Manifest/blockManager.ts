import fs from "fs/promises";
import { blocksPath } from "../ENV";
import Block from "../dto/Block";
import { signBlock } from "../utils/manager";
import { writeFileSync } from "fs";
import { hashCheck } from "./manifest";

export async function getBlocks() {
  const blocks = await fs.readFile(blocksPath, { encoding: "utf-8" });
  const list = !blocks ? [] : blocks.split("\n").filter((i) => !!i);
  return list.map((i) => ({
    signature: i,
    block: new Block(i),
  }));
}

export async function validateChain() {
  const blocks = await getBlocks();
  if (blocks.length === 0) return true;
  const lastBlock = blocks.at(-1);
  if (!lastBlock) throw false;

  let prevHash: bigint = blocks?.[0].block.hash;
  let prevInput: number = blocks?.[0].block.input;
  let prevSignature: string = blocks?.[0].signature;

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];

    if (
      prevHash === block.block.prevHash &&
      prevInput === block.block.prevInput &&
      prevSignature === block.block.prevSignature
    ) {
      prevHash = block.block.hash;
      prevInput = block.block.input;
      prevSignature = block.signature;
      continue;
    }
    return false;
  }
  return true;
}

export async function createNewBlock(block: Block) {
  const isValid = await validateChain();
  if (!isValid) throw new Error("Invalid Chain");
  const blocks = await getBlocks();
  const lastBlock = blocks.at(-1);
  if (!lastBlock) throw new Error();
  const lastBlockHash = lastBlock.block?.hash;
  const lastBlockInput = lastBlock.block?.input;
  const lastBlockSignature = lastBlock.signature;
  const isValidLastBlock = hashCheck(lastBlockInput.toString());

  if (
    block.input > lastBlockInput &&
    isValidLastBlock.hash === lastBlockHash &&
    isValidLastBlock.isPrime
  ) {
    block.prevHash = lastBlockHash;
    block.prevInput = lastBlockInput;
    block.prevSignature = lastBlockSignature;

    return writeFileSync(blocksPath, "\n" + signBlock(block), {
      flag: "a",
    });
  } else {
    console.log("LAST BLOCK IS INVALID");
  }
}
