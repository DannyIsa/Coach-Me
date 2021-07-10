import React from "react";

function EditableInput({ attribute, value, editing, state, setState }) {
  return (
    <div className="editable-input">
      <b>{attribute.split("_").join(" ") + ": "}</b>
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
        <span>{`${value} ${
          value !== "no value" &&
          (attribute === "weight"
            ? "kg"
            : attribute === "daily_calorie_goal"
            ? "cal"
            : "cm")
        }`}</span>
      ) : (
        // <b>{`${value}`}</b>
        <b>No Value</b>
      )}
    </div>
  );
}

export default EditableInput;
