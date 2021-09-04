import { RoomDisplay, RoomState } from "./room";

export interface ContextData {
  map: RoomDisplay[];
  char: RoomState[];
  ids: Record<number, number>;
}

export type ContextValue = {
  state: ContextData;
  toggleFree: (index: number) => void;
};
