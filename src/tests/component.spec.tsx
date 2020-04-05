import * as React from "react";
import * as renderer from "react-test-renderer";
import { ChangeMedia } from "..";

test("component testing", () => {
  const widthObj = {
    pc: 1025,
    tb: 768,
    ph: 767,
  };
  const component = renderer.create(
    <ChangeMedia widthObj={widthObj}>test</ChangeMedia>
  );
  const testInstance = component.root;

  expect(testInstance.findByType(ChangeMedia).props.widthObj.pc).toBe(1025);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
