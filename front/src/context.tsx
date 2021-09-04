import produce from "immer";
import { createContext, FC, useContext, useState } from "react";

import { defaultState } from "./constants";
import { ContextData, ContextValue } from "./types/context";

const Context = createContext<ContextValue | undefined>(undefined);

export const RoomContextProvider: FC = ({ children }) => {
  const [state, setState] = useState<ContextData>(defaultState);

  const toggleFree = (index: number) =>
    setState(
      produce((draft) => {
        draft.char[index].free = !draft.char[index].free;
      })
    );

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
