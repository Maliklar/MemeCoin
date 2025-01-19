import fs from "fs/promises";
import { blocksPath } from "../ENV";
import Block from "../dto/Block";
import { signBlock } from "../utils/manager";
import { writeFileSync } from "fs";

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
  const lastBlock = blocks.at(-1);
  if (!lastBlock) throw new Error("NO lastBlock");

  for (let i = blocks.length - 2; i >= 0; i--) {
    const block = blocks[i];
    if (
      block.block.prevHash !== lastBlock.block?.hash &&
      block.block.prevInput !== lastBlock.block?.input
    )
      throw new Error("Invalid Block Chain");
  }
  return true;
}

export async function createNewBlock(block: Block) {
  try {
    await validateChain();
    const blocks = await getBlocks();
    const lastBlock = blocks.at(-1);
    if (!lastBlock) throw new Error();
    block.prevHash = lastBlock.block?.hash;
    block.prevInput = lastBlock.block?.input;
    block.prevSignature = lastBlock?.signature;
  } catch {
    if (block.input !== 100) {
      // First block
      console.log("First Block");
    }
  }
  return writeFileSync(blocksPath, "\n" + signBlock(block), {
    flag: "a",
  });
}
