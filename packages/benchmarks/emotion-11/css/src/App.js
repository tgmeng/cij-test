import * as React from "react";
import App from "@cij-test/shared/components/App";

import Styled from "./views/Styled";
import CSS from "./views/CSS";
import CoreCSS from "./views/CoreCSS";

const routes = [
  {
    id: "styled",
    component: Styled,
  },
  {
    id: "css",
    component: CSS,
  },
  {
    id: "core-css",
    component: CoreCSS,
  },
];

export default function App() {
  return <App routes={routes} />;
}
