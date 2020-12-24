import * as React from "react";

import Control from "@cij-test/shared/components/Control";

const style = {
  display: "inline-block",
  width: "100px",
  height: "100px",
  backgroundColor: "#f00",
};

export default function VanillaStyle() {
  return (
    <Control>
      {list => list.map((item, index) => <div key={index} style={style} />)}
    </Control>
  );
}
