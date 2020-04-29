import React from "react";

function Search({term, handleSearch}) {
  return (
    <div>
      find countries <input value={term} onChange={handleSearch}/>
    </div>
  );
}

export default Search;
