import * as React from "react";
import App from "@cij-test/shared/components/App";

import Styled from "./views/Styled";
import CSS from "./views/CSS";

const routes = [
  {
    id: "styled",
    component: Styled,
  },
  {
    id: "css",
    component: CSS,
  },
];

export default function App() {
  return <App routes={routes} />;
}
