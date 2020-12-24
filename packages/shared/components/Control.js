import * as React from "react";
import PropTypes from "prop-types";

import { updateId } from "@cij-test/shared/utils/profiler";

const nodeAmountKey = "node-amount";

function Control({ children }) {
  const [value, updateValue] = React.useState(
    () => +localStorage.getItem(nodeAmountKey) || 1000
  );
  const [_, update] = React.useState(Date.now());

  const list = React.useMemo(() => Array(value).fill(""), [value]);
  return (
    <div>
      <div>
        <input
          type="number"
          value={value}
          min="1"
          onChange={event => updateValue(+event.target.value)}
        />
        <button onClick={() => localStorage.setItem(nodeAmountKey, value)}>
          Save
        </button>
        <button id={updateId} onClick={() => update(Date.now())}>
          Update
        </button>
      </div>
      {children(list)}
    </div>
  );
}

Control.propTypes = {
  children: PropTypes.func,
};

export default Control;
