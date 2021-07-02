import React from "react";

function EditableInput({ attribute, value, editing, state, setState }) {
  console.log(value);

  return (
    <div className="editable-input">
      <label>{attribute.replace("_", " ") + ": "}</label>
      {editing ? (
        <input
          type="number"
          min={0}
          defaultValue={value}
          onChange={(e) => {
            setState({
              ...state,
              [attribute]: e.target.value,
            });
          }}
        />
      ) : value ? (
        <b>{`${value} ${attribute === "weight" ? "kg" : "cm"}`}</b>
      ) : (
        // <b>{`${value}`}</b>
        <b>No Value</b>
      )}
    </div>
  );
}

export default EditableInput;
