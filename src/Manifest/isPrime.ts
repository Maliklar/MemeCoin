export default function isPrime(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  let i = 5n;
  while (i * i <= n) {
    if (n % i === 0n || n % (i + 2n) === 0n) {
      return false;
    }
    i += 6n;
  }
  return true;
}
