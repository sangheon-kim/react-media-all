import * as React from "react";

import { useDispatch } from "./common/State2";

interface Props {
  widthObj: any;
}

const ChangeMedia: React.FC<Props> = ({ children, widthObj }) => {
  const { pc, tb, ph } = widthObj;
  const withPromise = React.useCallback(
    (width: number) => {
      return new Promise((res) => {
        setTimeout(() => {
          if (width >= pc) {
            res("pc");
          } else if (width <= pc && width >= tb) {
            res("태블릿");
          } else if (width <= ph) {
            res("모바일");
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

export default ChangeMedia;
