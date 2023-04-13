import React from "react";

import CurrentData from "./CurrentData";
import Prognosis from "./Prognosis";

export default function Main() {
  return (
    <div className="main">
      <CurrentData />
      <Prognosis />
    </div>
  );
}
