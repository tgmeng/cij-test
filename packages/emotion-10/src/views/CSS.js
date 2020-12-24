/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Profiler } from "react";

import Control from "@cij-test/shared/components/Control";
import { commonProfilerCallback } from "@cij-test/shared/utils/profiler";

const boxStyle = css`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function CSS() {
  return (
    <Profiler id="EmotionCSS" onRender={commonProfilerCallback}>
      <Control>
        {list => list.map((item, index) => <div key={index} css={boxStyle} />)}
      </Control>
    </Profiler>
  );
}
