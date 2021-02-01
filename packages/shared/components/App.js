import * as React from "react";
import PropTypes from "prop-types";
import { Profiler } from "react";

const TableSizeKey = "table-size";

const CommonProfilerCallback = (
  id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime
) => {
  window.pushProfile?.({
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime,
  });
};

export default function App({ tableComponent: TableComponent, ...restProps }) {
  const [tableSize] = React.useState(() =>
    (new URLSearchParams(location.search).get(TableSizeKey) || "100x100")
      .split("x")
      .map(value => Number(value))
  );

  const dataSource = React.useMemo(() => {
    const [rows, cols] = tableSize;
    return Array(rows)
      .fill("")
      .map(() => Array(cols).fill(""));
  }, [tableSize]);

  const [_, update] = React.useState(0);
  const handleClickButton = React.useCallback(() => update(Date.now()), []);

  return (
    <Profiler id={TableComponent.name} onRender={CommonProfilerCallback}>
      <button id={window.updateButtonId} onClick={handleClickButton}>
        Update
      </button>
      <TableComponent dataSource={dataSource} />
    </Profiler>
  );
}

App.propTypes = {
  tableComponent: PropTypes.elementType,
};
