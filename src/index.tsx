import * as React from "react";
import {Provider, useDispatch, useGlobalState} from "./common/State2";
import {ActionType, DeviceType} from "./common";

interface Props {
  widthObj: any;
}
export const getState: any = useGlobalState;
export const WidthProvider: React.ComponentType = Provider;
export type SizeType = {
  pc: number | ((win: Window) => boolean);
  tb: number | ((win: Window) => boolean);
  ph: number | ((win: Window) => boolean);
}
export const ChangeMedia: React.FC<Props> = ({ children, widthObj }) => {
  const { pc, tb, ph } = widthObj as SizeType;
  const withPromise = React.useCallback(
      (win: Window) => {
        const width = win.innerWidth;
        return new Promise((res) => {
          setTimeout(() => {
            if (typeof pc === 'number' ? (width >= pc) : pc(win)) {
              res(DeviceType.PC);
            } else if (typeof tb === 'number' ? (width <= pc && width >= tb) : tb(win)) {
              res(DeviceType.TABLET);
            } else if (typeof ph === 'number' ? width <= ph : ph(win)) {
              res(DeviceType.MOBILE);
            }
          }, 800);
        });
      },
      [pc, ph, tb]
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      withPromise(window).then((res: any) => {
        dispatch({ type: ActionType.CHANGE_DEVICE, device: res });
      });

      window.addEventListener("resize", () => {
        withPromise(window).then((res: any) => {
          dispatch({ type: ActionType.CHANGE_DEVICE, device: res });
        });
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {
          withPromise(window).then((res: DeviceType) => {
            dispatch({ type: ActionType.CHANGE_DEVICE, device: res });
          });
        });
      }
    };
  }, [dispatch, withPromise]);

  return <React.Fragment>{children}</React.Fragment>;
};
