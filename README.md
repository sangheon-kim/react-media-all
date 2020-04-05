# react-media-all

#### Author - Sangheon Kim(ksj8367@gmail.com)

#### Version - 1.0.8

## Installing

### NPM

  <pre>$ npm i react-media-all</pre>

### Yarn

  <pre>$ yarn add react-media-all</pre>

## Usage

1. <code>index.tsx</code>

```javascript
// index.tsx

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WidthProvider } from "react-media-all";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <WidthProvider>
      <App />
    </WidthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

2. <code>App.tsx</code>
   코드를 붙여주세요. 자신이 원하는 디바이스 사이즈를 지정하여 widthObj 작성 후,
   ChangeMedia 컴포넌트안에 props값으로 전달해줍니다.<br />
   (Please put the code on it. Create wideObj by specifying the device size you want.
   Passes to the Props value in the ChangeMedia component.)

```javascript
// App.tsx
import React from "react";
import "./App.css";
import { ChangeMedia } from "react-media-all";
import Counter from "./components/Counter/Counter";

function App() {
  const widthObj: any = {
    pc: 1025,
    tb: 768,
    ph: 767,
  };
  return (
    <ChangeMedia widthObj={widthObj}>
      <h2>Counter</h2>
      <Counter />
    </ChangeMedia>
  );
}

export default App;
```

3. getState("device") 한 값을 기반으로 변수에 할당해주고 기호에 맞게 사용하시면됩니다.<br />
   (Assign it to a variable based on getState ("device") value and use it to your liking.)

```javascript
import * as React from "react";
import { getState } from "react-media-all";

const Counter = () => {
  const device = getState("device");

  return (
    <div>
      {device === "p" && <span>pc</span>}
      {device === "t" && <span>tablet</span>}
      {device === "m" && <span>mobile</span>}
    </div>
  );
};

export default Counter;
```

## Version Management

### v1.0.0

- [x] init Config

### v1.0~

- [x] Edit Jest, ts-jest Version(25.2.4 -> 24.3.1)<b>(v1.0.1)</b>
- [x] Edit Bug (export Variable)<b>(v1.0.2)</b>
- [x] Provider export<b>(v1.0.3)</b>
- [x] deploy after build <b>(v1.0.4)</b>
- [x] debug <b>(v1.0.5)</b>
- [x] add Readme File <b>(v1.0.6)</b>
- [x] Edit return device name<b>(v1.0.6)</b>
- [x] Edit README file<b>(v1.0.7)</b>
- [x] Edit Search Tag
