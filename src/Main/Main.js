import React from "react";

import TimeAndSearch from "./TimeAndSearch";
import CurrentData from "./CurrentData";
import Prognosis from "./Prognosis";

export default function Main() {
  return (
    <div className="main">
      <TimeAndSearch />
      <CurrentData />
      <Prognosis />
    </div>
  );
}
