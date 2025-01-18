import { randomUUID } from "crypto";
import { hash, hashCheck } from "./Manifest/manifest";
import { v4 as uuid } from "uuid";

async function main() {
  console.log("start");

  let i = 0;
  let j = 100000000000000;
  let k = -9156465465465;
  for (;;) {
    const v =
      j * i * k * Math.random() + uuid() + i + Math.random() + "" + j + "" + k;
    const value = hashCheck(v);
    if (value) {
      console.log("found", v, value);
      return;
    }
    i++;
    j++;
    k--;
  }
  console.log("finished");
}
main();
