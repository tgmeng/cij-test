import * as React from "react";
import PropTypes from "prop-types";

const style = {
  table: {
    display: "table",
  },
  row: {
    display: "table-row",
  },
  col: {
    display: "table-cell",
    padding: "10px",
    backgroundColor: "#f00",
  },
};

export default function VanillaStyleTable({ dataSource }) {
  return (
    <div style={style.table}>
      {dataSource.map((cols, rowIndex) => (
        <div key={rowIndex} style={style.row}>
          {cols.map((value, colIndex) => (
            <div key={colIndex} style={style.col}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

VanillaStyleTable.propTypes = {
  dataSource: PropTypes.array,
};
