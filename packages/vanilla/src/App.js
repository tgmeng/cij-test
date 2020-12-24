import * as React from "react";
import TestApp from "@cij-test/shared/components/TestApp";

import VanillaStyle from "./views/VanillaStyle";
import VanillaCSS from "./views/VanillaCSS";

const TestType = {
  VanillaCSS: "vanilla-css",
  VanillaStyle: "vanilla-style",
};

export default function App() {
  return (
    <TestApp testTypeMap={TestType}>
      {({ type }) => {
        const Cpn =
          {
            [TestType.VanillaStyle]: VanillaStyle,
            [TestType.VanillaCSS]: VanillaCSS,
          }[type] || null;
        return Cpn ? <Cpn /> : null;
      }}
    </TestApp>
  );
}
