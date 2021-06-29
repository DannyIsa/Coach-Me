import React from "react";

function EditableInput({ attribute, value, editing }) {
  return (
    <div className="editable-input">
      <label>{attribute + ": "}</label>
      {editing ? (
        <input type="number" min={0} defaultValue={value} />
      ) : value ? (
        // <b>{`${value} ${attribute === "Weight" ? "kg" : "cm"}`}</b>
        <b>{`${value}`}</b>
      ) : (
        <b>No Value</b>
      )}
    </div>
  );
}

export default EditableInput;
