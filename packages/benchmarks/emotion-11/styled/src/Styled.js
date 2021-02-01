import * as React from "react";
import styled from "@emotion/styled";

const Box = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #f00;
`;

export default function Styled() {
  return <Box />;
}
