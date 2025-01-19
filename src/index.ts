import Block from "./dto/Block";
import { dir, encOwnerId } from "./ENV";

async function main() {
  console.log("start");
  console.log(dir);

  let i = 117;
  while (i <= 117) {
    try {
      const block = new Block(encOwnerId, 117);
      await block.commit();
    } catch {
      console.log("hash value is not prime");
    }
    i++;
  }
  // console.log("found:", block, i);

  console.log("finished");
}
main();
