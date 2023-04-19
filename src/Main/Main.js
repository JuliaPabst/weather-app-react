import React from "react";

import CurrentData from "./CurrentData";

export default function Main() {
  return (
    <div className="main">
      <CurrentData defaultCity="Vienna" />
    </div>
  );
}
