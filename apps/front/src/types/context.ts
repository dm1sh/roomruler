import { RoomDisplay, RoomState } from "./room";

export interface ContextData {
  map: RoomDisplay[];
  char: RoomState[];
  ids: Record<number, number>;
  boardSize: { w: number; h: number };
}

export type ContextValue = {
  state: ContextData;
  toggleFree: (index: number) => void;
};
