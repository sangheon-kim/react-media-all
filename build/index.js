'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var initialState = {
    device: "",
};

var stateCtx = React.createContext(initialState);
var dispatchCtx = React.createContext((function () { return 0; }));
var useDispatch = function () {
    return React.useContext(dispatchCtx);
};

var ChangeMedia = function (_a) {
    var children = _a.children, widthObj = _a.widthObj;
    var pc = widthObj.pc, tb = widthObj.tb, ph = widthObj.ph;
    var withPromise = React.useCallback(function (width) {
        return new Promise(function (res) {
            setTimeout(function () {
                if (width >= pc) {
                    res("pc");
                }
                else if (width <= pc && width >= tb) {
                    res("태블릿");
                }
                else if (width <= ph) {
                    res("모바일");
                }
            }, 800);
        });
    }, [pc, ph, tb]);
    var dispatch = useDispatch();
    React.useEffect(function () {
        if (typeof window !== "undefined") {
            withPromise(window.innerWidth).then(function (res) {
                dispatch({ type: "CHANGE_DEVICE", device: res });
            });
            window.addEventListener("resize", function () {
                withPromise(window.innerWidth).then(function (res) {
                    dispatch({ type: "CHANGE_DEVICE", device: res });
                });
            });
        }
        return function () {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", function () {
                    withPromise(window.innerWidth).then(function (res) {
                        dispatch({ type: "CHANGE_DEVICE", device: res });
                    });
                });
            }
        };
    }, [dispatch, withPromise]);
    return React.createElement(React.Fragment, null, children);
};

exports.default = ChangeMedia;
//# sourceMappingURL=index.js.map
