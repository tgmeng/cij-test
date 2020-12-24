import * as React from "react";
import { Profiler } from "react";
import styled from "@emotion/styled";

import Control from "@cij-test/shared/components/Control";
import { commonProfilerCallback } from "@cij-test/shared/utils/profiler";

const Box = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function Styled() {
  return (
    <Profiler id="EmotionStyled" onRender={commonProfilerCallback}>
      <Control>
        {list => list.map((item, index) => <Box key={index} />)}
      </Control>
    </Profiler>
  );
}
