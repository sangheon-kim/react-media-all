export declare const CHANGE_DEVICE = "CHANGE_DEVICE";
export declare const initialState: {
    device: string;
};
export declare type State = typeof initialState;
export declare type Action = {
    type: "CHANGE_DEVICE";
    device: string;
};
export declare const reducer: (state: {
    device: string;
}, action: Action) => {
    device: string;
};
