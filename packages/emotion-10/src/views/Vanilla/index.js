import * as React from "react";

import Control from "../../components/Control";
import "./index.css";

export default function CSS() {
  return (
    <Control>
      {list => list.map((item, index) => <div key={index} className="box" />)}
    </Control>
  );
}
