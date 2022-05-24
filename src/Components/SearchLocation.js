import React from "react";

export default function SearchLocation({
  handleSubmit,
  inputData,
  setInputData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="search">Search Location</label> */}
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
          placeholder="Search Location"
        />
        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="18"
            height="18"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}
