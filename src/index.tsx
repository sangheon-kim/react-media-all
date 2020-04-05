import * as React from "react";
import { Provider } from "./common/State2";
import { useDispatch, useGlobalState } from "./common/State2";

interface Props {
  widthObj: any;
}
export const getState: any = useGlobalState;
export const WidthProvider: React.ComponentType = Provider;
export const ChangeMedia: React.FC<Props> = ({ children, widthObj }) => {
  const { pc, tb, ph } = widthObj;
  const withPromise = React.useCallback(
    (width: number) => {
      return new Promise((res) => {
        setTimeout(() => {
          if (width >= pc) {
            res("p");
          } else if (width <= pc && width >= tb) {
            res("t");
          } else if (width <= ph) {
            res("m");
          }
        }, 800);
      });
    },
    [pc, ph, tb]
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      withPromise(window.innerWidth).then((res: any) => {
        dispatch({ type: "CHANGE_DEVICE", device: res });
      });

      window.addEventListener("resize", () => {
        withPromise(window.innerWidth).then((res: any) => {
          dispatch({ type: "CHANGE_DEVICE", device: res });
        });
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {
          withPromise(window.innerWidth).then((res: any) => {
            dispatch({ type: "CHANGE_DEVICE", device: res });
          });
        });
      }
    };
  }, [dispatch, withPromise]);

  return <React.Fragment>{children}</React.Fragment>;
};
