import * as React from "react";
import { Action } from ".";
export declare const Provider: React.ComponentType;
export declare const useDispatch: () => React.Dispatch<Action>;
export declare const useGlobalState: <K extends "device">(property: K) => {
    device: string;
}[K];
