import { createContext, FC, useContext, useState } from "react";
import { ContextData, ContextValue } from "./types";

const defaultState: ContextData = { x: 0 };

const Context = createContext<ContextValue | undefined>(undefined);

export const RoomContextProvider: FC = ({ children }) => {
  const [state, setState] = useState(defaultState);

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
