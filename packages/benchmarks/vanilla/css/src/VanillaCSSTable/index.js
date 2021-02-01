import * as React from "react";
import PropTypes from "prop-types";

import "./index.css";

export default function VanillaCSSTable({ dataSource }) {
  return (
    <div className="table">
      {dataSource.map((cols, rowIndex) => (
        <div key={rowIndex} className="table__row">
          {cols.map((value, colIndex) => (
            <div key={colIndex} className="table__cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

VanillaCSSTable.propTypes = {
  dataSource: PropTypes.array,
};
