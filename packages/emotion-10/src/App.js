import * as React from "react";

import Styled from "./views/Styled";
import CSS from "./views/CSS";
import Vanilla from "./views/Vanilla";

const TestType = {
  Styled: "styled",
  CSS: "css",
  Vanilla: "vanilla",
};

export default function App() {
  const type = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("type") || TestType.Styled;
  }, []);
  return (
    <div>
      {type === TestType.Styled ? <Styled /> : null}
      {type === TestType.CSS ? <CSS /> : null}
      {type === TestType.Vanilla ? <Vanilla /> : null}
    </div>
  );
}
