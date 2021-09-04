import { createContext, FC, useContext, useState } from "react";
import { defaultState } from "./constants";
import { ContextData, ContextValue } from "./types/context";

const Context = createContext<ContextValue | undefined>(undefined);

export const RoomContextProvider: FC = ({ children }) => {
  const [state, setState] = useState<ContextData>(defaultState);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error("useRoomContext must be used within RoomContextProvider");

  return context;
};
