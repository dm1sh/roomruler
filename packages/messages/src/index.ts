export type Message = {
  type: string;
  args: unknown;
};

export type UpdateMessage = Message & {
  type: "update";
  args: {
    id: number;
    value: boolean;
  };
};

const isObjLike = (obj: unknown): obj is object =>
  Boolean(obj) && typeof obj === "object";

const hasProperty = <T extends {}, U extends PropertyKey>(
  obj: T,
  prop: U
): obj is T & Record<U, unknown> => prop in obj;

export const isMessage = (obj: unknown): obj is Message =>
  isObjLike(obj) &&
  hasProperty(obj, "type") &&
  typeof obj.type === "string" &&
  hasProperty(obj, "args");

export const isUpdateMessage = (message: Message): message is UpdateMessage =>
  isObjLike(message.args) &&
  hasProperty(message.args, "id") &&
  typeof message.args.id === "number" &&
  hasProperty(message.args, "value") &&
  typeof message.args.value === "boolean";
