'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var CHANGE_DEVICE = "CHANGE_DEVICE";
var initialState = {
    device: "",
};
var reducer = function (state, action) {
    switch (action.type) {
        case CHANGE_DEVICE:
            return __assign(__assign({}, state), { device: action.device });
        default:
            return state;
    }
};

var stateCtx = React.createContext(initialState);
var dispatchCtx = React.createContext((function () { return 0; }));
var Provider = function (_a) {
    var children = _a.children;
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    return (React.createElement(dispatchCtx.Provider, { value: dispatch },
        React.createElement(stateCtx.Provider, { value: state }, children)));
};
var useDispatch = function () {
    return React.useContext(dispatchCtx);
};
var useGlobalState = function (property) {
    var state = React.useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
};

var getState = useGlobalState;
var WidthProvider = Provider;
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

exports.ChangeMedia = ChangeMedia;
exports.WidthProvider = WidthProvider;
exports.getState = getState;
//# sourceMappingURL=index.js.map
