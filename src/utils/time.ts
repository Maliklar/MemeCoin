import { startTime } from "../ENV";

export default function time() {
  return Date.now() - startTime;
}
