import { signData } from "./utils/manager";

const startTime = Number(process.env.START_TIME);
const secretKey = String(process.env.SECRET_KEY);
const ownerId = String(process.env.OWNER_ID);
if (isNaN(startTime))
  throw new Error("Error Initializing Constants: startTime" + startTime);
if (!secretKey)
  throw new Error("Error Initializing Constants: secretKey" + secretKey);

export const dir = __dirname;
export const blocksPath = `${__dirname}\\blocks\\blocks.blk`;

const encOwnerId = signData(ownerId);

export { startTime, secretKey, encOwnerId };
