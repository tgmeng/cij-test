import * as React from "react";
import PropTypes from "prop-types";

function Control({ children }) {
  const [value, updateValue] = React.useState(100);
  const [_, update] = React.useState(Date.now());

  const handleChange = React.useCallback(
    event => updateValue(+event.target.value),
    []
  );

  const list = React.useMemo(() => Array(value).fill(""), [value]);
  return (
    <div>
      <div>
        <input type="number" value={value} min="1" onChange={handleChange} />
        <button onClick={() => update(Date.now())}>Update</button>
      </div>
      {children(list)}
    </div>
  );
}

Control.propTypes = {
  children: PropTypes.function,
};

export default Control;
