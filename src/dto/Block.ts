/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { blocksPath } from "../ENV";
import { createNewBlock } from "../Manifest/blockManager";
import { hashCheck } from "../Manifest/manifest";
import time from "../utils/time";

export default class Block {
  public input: number; // The a number that the hash function digest should produce a prime
  public hash: bigint;
  public owner: string;
  public timestamp: number;
  public prevHash?: bigint;
  public prevInput?: number;
  public prevSignature?: string;

  constructor(ownerOrEncrypted: string, input?: number) {
    if (!input) {
      const data = jwt.decode(ownerOrEncrypted) as Block;
      this.owner = data.owner;
      this.input = Number(data.input);
      this.hash = BigInt(data.hash);
      this.prevHash = BigInt(data.prevHash?.toString() || "");
      this.prevInput = Number(data.prevInput?.toString() || "");
      this.timestamp = data.timestamp;
      this.prevSignature = data.prevSignature;
    } else {
      this.owner = ownerOrEncrypted;
      this.input = input;
    }

    const { hash, isPrime } = hashCheck(this.input.toString());

    if (!isPrime) throw new Error("Hash value is not Prime");
    this.hash = hash;
    this.timestamp = time();
  }

  public async validate() {
    const blocks = await fs.readFile(blocksPath, { encoding: "utf-8" });
    const list = blocks.split("\n");
    const last = list.at(-1);
    if (!last)
      throw new Error(
        "Block list is invalid or you have created the first block"
      );
    const block = new Block(last);
    if (block) return true;
  }

  async commit() {
    await createNewBlock(this);
  }

  public serialize(object: Block | any = this) {
    const clone = structuredClone(object) as any;
    if (!clone) throw new Error();
    const keyValue = Object.entries(clone);
    for (const [key, value] of keyValue) {
      if (typeof value === "bigint") {
        clone[key] = value.toString();
      }
      if (typeof value === "object" && typeof value !== "bigint" && value) {
        clone[key] = this.serialize(value);
      }
    }
    console.log(clone);
    return JSON.stringify(clone);
  }
}
