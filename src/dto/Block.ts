import jwt from "jsonwebtoken";
import { hashCheck } from "../Manifest/manifest";
import { Pointer } from "./types";
import fs from "fs/promises";
import time from "../utils/time";
import { blocksPath } from "../ENV";

export default class Block {
  public input: number; // The a number that the hash function digest should produce a prime
  public owner: string;
  public timestamp: number;
  public header: Pointer;
  public prev?: Pointer;

  constructor(ownerOrEncrypted: string, input?: number, prev?: Pointer) {
    if (!input) {
      const data = jwt.decode(ownerOrEncrypted) as Block;
      this.owner = data.owner;
      this.input = data.input;
      this.header = data.header;
      this.prev = data.prev;
      this.timestamp = data.timestamp;
    } else {
      this.owner = ownerOrEncrypted;
      this.input = input;
      this.prev = prev;
    }

    const { hash, isPrime } = hashCheck(this.input.toString());
    if (!isPrime) throw new Error("Hash value is not Prime");
    this.header = { hash, input: this.input };
    this.timestamp = time();
  }

  public async validateBlock() {
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

  public serialize() {
    return JSON.stringify(this);
  }
}
