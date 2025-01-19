import Block from "./dto/Block";
import { dir, encOwnerId } from "./ENV";
import { hashCheck } from "./Manifest/manifest";
import { writeBlock } from "./utils/manager";

async function main() {
  console.log("start");
  console.log(dir);

  let i = 0;
  while (true) {
    const check = hashCheck(i.toString());
    if (check.isPrime) {
      const block = new Block(encOwnerId, i);
      writeBlock(block);
      console.log("found:", check, i);
    }
    i++;
  }

  console.log("finished");
}
main();
