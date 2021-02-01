/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const boxStyle = css`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function CSS() {
  return <div css={boxStyle} />;
}
