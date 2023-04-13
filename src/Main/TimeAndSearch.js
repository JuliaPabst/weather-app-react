import React from "react";

export default function TimeAndSearch() {
  return (
    <div className="TimeAndSearch">
      <div className="row">
        <div className="col-5 currentDate">Saturday 10:00</div>
        <div className="col-7">
          <form>
            <input
              className="enterACity"
              placeholder="Enter a city..."
              type="search"
            />
            <button className="submit" type="submit" value="search">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
