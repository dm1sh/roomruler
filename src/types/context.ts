import { RoomDisplay, RoomState } from "./room";

export interface ContextData {
  map: RoomDisplay[];
  char: RoomState[];
}

export type ContextValue = {
  state: ContextData;
  toggleFree: (index: number) => void;
};
