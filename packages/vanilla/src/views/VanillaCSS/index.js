import * as React from "react";
import { Profiler } from "react";

import Control from "@cij-test/shared/components/Control";
import { commonProfilerCallback } from "@cij-test/shared/utils/profiler";

import "./index.css";

export default function CSS() {
  return (
    <Profiler id="VanillaCSS" onRender={commonProfilerCallback}>
      <Control>
        {list => list.map((item, index) => <div key={index} className="box" />)}
      </Control>
    </Profiler>
  );
}
