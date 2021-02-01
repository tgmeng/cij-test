import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "@cij-test/shared/components/App";

import Table from "./EmotionStyledTable";

const node = document.createElement("div");
document.body.appendChild(node);

ReactDOM.render(<App tableComponent={Table} />, node);
