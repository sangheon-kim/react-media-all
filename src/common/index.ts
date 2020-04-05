export const CHANGE_DEVICE = "CHANGE_DEVICE";

export const initialState = {
  device: "",
};

export type State = typeof initialState;

export type Action = { type: "CHANGE_DEVICE"; device: string };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case CHANGE_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    default:
      return state;
  }
};
