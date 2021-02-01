import * as React from "react";
import { css } from "@emotion/css";

import PropTypes from "prop-types";

const tableStyle = css`
  display: table;
`;

const tableRowStyle = css`
  display: table-row;
`;

const tableCellStyle = css`
  display: table-cell;
  padding: 10px;
  background-color: #f00;
`;

export default function EmotionCSSTable({ dataSource }) {
  return (
    <div className={tableStyle}>
      {dataSource.map((cols, rowIndex) => (
        <div key={rowIndex} className={tableRowStyle}>
          {cols.map((value, colIndex) => (
            <div key={colIndex} className={tableCellStyle}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

EmotionCSSTable.propTypes = {
  dataSource: PropTypes.array,
};
