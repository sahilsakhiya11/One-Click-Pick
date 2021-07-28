import React from "react";

const CategoryForm = ({handleSubmit, name, setName}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group w-25">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary w-100">Save</button>
    </div>
  </form>
)

export default CategoryForm;
