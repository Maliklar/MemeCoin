import { randomUUID } from "crypto";
import { hash, hashCheck } from "./Manifest/manifest";

async function main() {
  console.log("start");

  let i = 0;
  for (;;) {
    const value = hashCheck(i.toString());

    if (value) {
      console.log("found", i, value);
      return;
    }
    i++;
  }
  console.log("finished");
}
main();
