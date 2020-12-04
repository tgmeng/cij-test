/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Control from "../components/Control";

const boxStyle = css`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function CSS() {
  return (
    <Control>
      {list => list.map((item, index) => <div key={index} css={boxStyle} />)}
    </Control>
  );
}