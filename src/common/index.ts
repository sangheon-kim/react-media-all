export const CHANGE_DEVICE = "CHANGE_DEVICE";
export enum ActionType {
  CHANGE_DEVICE = "CHANGE_DEVICE"
}

export enum DeviceType {
  UNKNOWN = 'u',
  PC = 'p',
  TABLET = 't',
  MOBILE = 'm',
}

export const initialState = {
  device: DeviceType.UNKNOWN,
};

export type State = typeof initialState;

export type Action = { type: ActionType; device: DeviceType };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.CHANGE_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    default:
      return state;
  }
};
