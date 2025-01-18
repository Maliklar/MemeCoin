import { BinaryLike } from "crypto";
import { hashCheck } from "../Manifest/manifest";
import { Pointer, RemoveFunctions, SerializedPointer } from "./types";

type SerializedBlock = RemoveFunctions<Block> & {
  input: string;
  next: SerializedPointer;
  prev?: SerializedPointer;
  timestamp: number;
};

export default class Block {
  public input: BinaryLike; // The a number that the hash function digest should produce a prime
  public owner: string;
  private timestamp: number;
  private next: Pointer;
  private prev?: Pointer;

  constructor(owner: string, input: BinaryLike, prev?: Pointer) {
    this.owner = owner;
    this.input = input;
    const { hash, isPrime } = hashCheck(this.input);
    if (!isPrime) throw new Error("Hash value is not Prime");
    this.next = { hash, input: this.input };
    this.timestamp = Date.now();
    this.prev = prev;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getNext() {
    return this.next;
  }
  getPrev() {
    return this.prev;
  }

  public serialize() {
    const json: SerializedBlock = {
      input: this.input.toString(),
      owner: this.owner,
      timestamp: this.timestamp,
      prev: this.prev && {
        hash: this.prev.hash.toString(),
        input: this.prev.input,
      },
      next: {
        hash: this.next?.hash.toString(),
        input: this.next?.input,
      },
    };
    return JSON.stringify(json);
  }
}
