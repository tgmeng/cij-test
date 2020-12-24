import * as React from "react";
import PropTypes from "prop-types";

export default function TestApp({ testTypeMap, children }) {
  const type = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("type") || Object.values(testTypeMap)[0] || "";
  }, []);

  return (
    <div>
      <ul>
        {Object.values(testTypeMap).map(type => (
          <li
            key={type}
            onClick={() => {
              const params = new URLSearchParams(location.search);
              params.set("type", type);
              location.search = `?${params.toString()}`;
            }}
          >
            {type}
          </li>
        ))}
      </ul>
      <div>{children({ type })}</div>
    </div>
  );
}

TestApp.propTypes = {
  testTypeMap: PropTypes.object,
  children: PropTypes.func,
};
