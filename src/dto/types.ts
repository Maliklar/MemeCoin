import { BinaryLike } from "crypto";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export type Pointer = {
  input: BinaryLike;
  hash: bigint;
};

export type SerializedPointer = Omit<Pointer, "hash"> & {
  hash: string;
};

export type NonFunctionKeyNames<T> = Exclude<
  {
    [key in keyof T]: T[key] extends Function ? never : key;
  }[keyof T],
  undefined
>;

export type RemoveFunctions<T> = Pick<T, NonFunctionKeyNames<T>>;
