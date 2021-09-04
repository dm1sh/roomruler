import { Dispatch, SetStateAction } from "react";
import { RoomDisplay, RoomState } from "./room";

export interface ContextData {
  map: RoomDisplay[];
  char: RoomState[];
}

export type ContextValue = {
  state: ContextData;
  setState: Dispatch<SetStateAction<ContextData>>;
};
