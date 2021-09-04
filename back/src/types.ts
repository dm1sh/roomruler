import { idMsgTypes } from "./constants";

export type IdMsgTypes = typeof idMsgTypes[number];

export type Message = {
  type: string;
  args: unknown;
};

export type IdMessage = Message & {
  type: IdMsgTypes;
  args: {
    id: number;
  };
};

const hasProperty = <T extends {}, U extends PropertyKey>(
  obj: T,
  prop: U
): obj is T & Record<U, unknown> => prop in obj;

export const isMessage = (obj: unknown): obj is Message =>
  typeof obj === "object" &&
  hasProperty(obj, "type") &&
  typeof obj.type === "string" &&
  hasProperty(obj, "args");

export const isIdMessage = (message: Message): message is IdMessage =>
  idMsgTypes.reduce((prev, curr) => prev || curr === message.type, false) &&
  typeof message.args === "object" &&
  hasProperty(message.args, "id") &&
  typeof message.args.id === "number";
