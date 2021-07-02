import React from "react";

function EditableInput({ attribute, value, editing, state, setState }) {
  return (
    <div className="editable-input">
      <label>{attribute.split("_").join(" ") + ": "}</label>
      {editing ? (
        <input
          type="number"
          min={0}
          defaultValue={value === "no value" ? 0 : value}
          onChange={(e) => {
            setState({
              ...state,
              [attribute]: e.target.value,
            });
          }}
        />
      ) : value ? (
        <b>{`${value} ${
          value !== "no value" &&
          (attribute === "weight"
            ? "kg"
            : attribute === "daily_calorie_goal"
            ? "cal"
            : "cm")
        }`}</b>
      ) : (
        // <b>{`${value}`}</b>
        <b>No Value</b>
      )}
    </div>
  );
}

export default EditableInput;
