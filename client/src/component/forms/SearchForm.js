import React from "react";

const SearchForm = ({keyword, setKeyword}) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
      <input
        type="search"
        placeholder="Enter a keyword to search category"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-5 mt-5 w-25"
      />
  );
};

export default SearchForm;
