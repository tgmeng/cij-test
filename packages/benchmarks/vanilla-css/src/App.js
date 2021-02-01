import * as React from "react";
import App from "@cij-test/shared/components/App";

import VanillaStyle from "./views/VanillaStyle";
import VanillaCSS from "./VanillaCSS";

const routes = [
  {
    id: "vanilla-css",
    component: VanillaCSS,
  },
  {
    id: "vanilla-style",
    component: VanillaStyle,
  },
];

export default function App() {
  return <App routes={routes} />;
}
