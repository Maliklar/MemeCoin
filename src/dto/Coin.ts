import isPrime from "../utils/isPrime";
import time from "../utils/time";

export default class Coin {
  ownerPK = "";
  next: Coin;
  prime: number | undefined;
  timestamp: number;

  constructor(ownerPK?: string, prime?: number) {
    this.ownerPK = ownerPK;
    if (typeof prime !== "undefined" && !isPrime(+prime))
      throw new Error("NOT PRIME");

    this.prime = prime;
    this.timestamp = time();
    this.next = new Coin();
  }

  setNext(coin: Coin) {}
}
