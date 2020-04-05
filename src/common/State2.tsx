import * as React from "react";

import { Action, initialState, reducer, State } from ".";

const stateCtx = React.createContext(initialState);
const dispatchCtx = React.createContext((() => 0) as React.Dispatch<Action>);

export const WithProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useDispatch = () => {
  return React.useContext(dispatchCtx);
};

export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = React.useContext(stateCtx);
  return state[property]; // only one depth selector for comparison
};
