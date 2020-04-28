import React from "react";

const Filter = ({ term, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={term} onChange={handleSearch}></input>
    </div>
  );
};

export default Filter;
