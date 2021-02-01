/** @jsx jsx */
import { jsx, css } from "@emotion/react";
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

export default function EmotionReactCssTable({ dataSource }) {
  return (
    <div css={tableStyle}>
      {dataSource.map((cols, rowIndex) => (
        <div key={rowIndex} css={tableRowStyle}>
          {cols.map((value, colIndex) => (
            <div key={colIndex} css={tableCellStyle}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

EmotionReactCssTable.propTypes = {
  dataSource: PropTypes.array,
};
