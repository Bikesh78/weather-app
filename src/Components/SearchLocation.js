import React from "react";

export default function SearchLocation({
  handleSubmit,
  inputData,
  setInputData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="search">Search Location</label> */}
      <input
        type="text"
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
        placeholder="Search Location"
      />
      <input type="submit" value="Search" />
    </form>
  );
}
