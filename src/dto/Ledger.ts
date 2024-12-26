import Transaction from "./Transaction";

export default class Ledger {
  ownerPK = "";
  transactions: Transaction[];
  ownerSignature = "";
  value: number;

  constructor(ownerPK: string, ownerSignature: string) {
    this.ownerPK = ownerPK;
    this.ownerSignature = ownerPK;
  }
}
