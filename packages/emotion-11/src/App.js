import * as React from "react";
import TestApp from "@cij-test/shared/components/TestApp";

import Styled from "./views/Styled";
import CSS from "./views/CSS";

const TestType = {
  Styled: "styled",
  CSS: "css",
};

export default function App() {
  return (
    <TestApp testTypeMap={TestType}>
      {({ type }) => {
        const Cpn =
          {
            [TestType.Styled]: Styled,
            [TestType.CSS]: CSS,
          }[type] || null;
        return Cpn ? <Cpn /> : null;
      }}
    </TestApp>
  );
}
