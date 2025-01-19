/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFileSync } from "fs";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { blocksPath } from "../ENV";
import { hashCheck } from "../Manifest/manifest";
import { signBlock } from "../utils/manager";
import time from "../utils/time";
import { Pointer } from "./types";

export default class Block {
  public input: number; // The a number that the hash function digest should produce a prime
  public hash: bigint;
  public owner: string;
  public timestamp: number;
  public prev?: Pointer;

  constructor(ownerOrEncrypted: string, input?: number, prev?: Pointer) {
    if (!input) {
      const data = jwt.decode(ownerOrEncrypted) as Block;
      this.owner = data.owner;
      this.input = data.input;
      this.hash = data.hash;
      this.prev = data.prev;
      this.timestamp = data.timestamp;
    } else {
      this.owner = ownerOrEncrypted;
      this.input = input;
      this.prev = prev;
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
    return writeFileSync(`${blocksPath}`, "\n" + signBlock(this), {
      flag: "a",
    });
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
    return JSON.stringify(clone);
  }
}
