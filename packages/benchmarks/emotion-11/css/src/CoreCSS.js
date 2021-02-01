import * as React from "react";
import { css } from "@emotion/css";

const boxStyle = css`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function CoreCSS() {
  return <div className={boxStyle} />;
}
