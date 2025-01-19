import Block from "./dto/Block";
import { dir, encOwnerId } from "./ENV";

async function main() {
  console.log("start");
  console.log(dir);

  const i = 100;
  const block = new Block(encOwnerId, i);
  await block.commit();
  await block.commit();
  console.log("found:", block, i);

  console.log("finished");
}
main();
