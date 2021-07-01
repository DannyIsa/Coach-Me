import React from "react";

function EditableInput({
  attribute,
  value,
  editing,
  measureLogs,
  setMeasureLogs,
}) {
  return (
    <div className="editable-input">
      <label>{attribute.replace("_", " ") + ": "}</label>
      {editing ? (
        <input
          type="number"
          min={0}
          defaultValue={value}
          onChange={(e) => {
            setMeasureLogs({
              ...measureLogs,
              [attribute]: e.target.value,
            });
          }}
        />
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
