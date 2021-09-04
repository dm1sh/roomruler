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

export type Room = {
  id: number;
  title: string;
  free: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ListMessage = Message & {
  type: "list";
  args: Room[];
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

export const isRoom = (obj: unknown): obj is Room => {
  if (!(typeof obj === "object") || !obj) return false;

  const ns = ["id", "x", "y", "width", "height"] as const;
  for (const key of ns) {
    if (!hasProperty(obj, key) || typeof obj[key] !== "number") return false;
  }

  if (
    !hasProperty(obj, "title") ||
    typeof obj.title !== "string" ||
    !hasProperty(obj, "free") ||
    typeof obj.free !== "boolean"
  )
    return false;

  return true;
};

export const isArrayOf = <T extends unknown>(
  obj: T,
  itemCheck: (arg: T) => boolean
) => {
  if (Array.isArray(obj)) {
    for (const el of obj) if (!itemCheck(el)) return false;
    return true;
  } else return false;
};

export const composeMessage = <T extends Message>(
  type: T["type"],
  args: T["args"]
): Message => ({
  type,
  args,
});
