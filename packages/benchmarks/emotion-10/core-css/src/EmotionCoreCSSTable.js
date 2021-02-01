/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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

export default function EmotionCoreCSSTable({ dataSource }) {
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

EmotionCoreCSSTable.propTypes = {
  dataSource: PropTypes.array,
};
