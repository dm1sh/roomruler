import { Dispatch, SetStateAction } from "react";

export interface ContextData {
  // TODO: describe state
}

export interface ContextValue {
  state: ContextData;
  setState: Dispatch<SetStateAction<ContextData>>;
}
