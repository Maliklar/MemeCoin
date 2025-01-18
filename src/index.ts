import Block from "./dto/Block";
import { dir } from "./ENV";
import { hashCheck } from "./Manifest/manifest";

async function main() {
  console.log("start");
  console.log(dir);

  let i = 0;
  while (true) {
    const check = hashCheck(i.toString());
    if (check.isPrime) {
      const block = new Block("malik", i.toString());
      console.log(block);

      break;
    }
    i++;
  }

  console.log("finished");
}
main();
