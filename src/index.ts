import hash from "./hashing/hash";

async function main() {
  console.log("start");

  // const buffers = [];

  // for (let i = 0; i < 100000; i++) {
  //   buffers.push(Buffer.alloc(10000, 10000));
  // }
  const buffer = Buffer.allocUnsafe(12);

  console.log(buffer);
  const value = hash(buffer);
  console.log(value);
}
main();
