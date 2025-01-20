import Block from "./dto/Block";
import { dir, encOwnerId } from "./ENV";

async function main() {
  console.log("start");
  console.log(dir);

  const block = new Block(encOwnerId, 100);
  await block.commit();
  const block2 = new Block(encOwnerId, 117);
  await block2.commit();
  const block3 = new Block(encOwnerId, 162);
  await block3.commit();

  // console.log("found:", block, i);

  console.log("finished");
}
main();
