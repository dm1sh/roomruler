import produce from "immer";
import { createContext, FC, useContext, useEffect, useState } from "react";

import { defaultState } from "./constants";
import { ContextData, ContextValue } from "./types/context";
import { isArrayOf, isMessage, isRoom } from "@roomruler/messages";
import { WS_URL } from "./config";
import { RoomDisplay, RoomState } from "./types/room";

const Context = createContext<ContextValue | undefined>(undefined);

const ws = new WebSocket(WS_URL);

export const RoomContextProvider: FC = ({ children }) => {
  const [state, setState] = useState<ContextData>(defaultState);

  const toggleFree = (index: number) => {};

  useEffect(() => {
    ws.onmessage = ({ data }) => {
      const message: unknown = JSON.parse(data);
      if (isMessage(message) && isArrayOf(message.args, isRoom)) {
        const map: RoomDisplay[] = [],
          char: RoomState[] = [],
          ids: Record<number, number> = {};

        for (const {
          x,
          y,
          height: h,
          width: w,
          title,
          free,
          id,
        } of message.args) {
          map.push({ coordinates: { x, y }, size: { w, h }, title: title });
          char.push({ free });
          ids[id] = map.length - 1;
        }

        setState({ map, char, ids });
      }
    };
  }, []);

  return (
    <Context.Provider value={{ state, toggleFree }}>
      {children}
    </Context.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error("useRoomContext must be used within RoomContextProvider");

  return context;
};
