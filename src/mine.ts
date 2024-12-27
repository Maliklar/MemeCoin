import Ledger from "./dto/Coin";
import isPrime from "./utils/isPrime";

export default function mine(ledger: Ledger) {
  let value = ledger.value;

  while (!isPrime(value)) {
    value++;
  }
  const ledger = new Ledger("", "");
}
