import React, { useState, useEffect } from "react";
import axios from "axios";
function EditableInput({
  attribute,
  value,
  clients,
  setClients,
  traineeId,
  userDetails,
}) {
  const [editing, setEditing] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const handleEdit = () => {
    if (!editing) {
      setEditing(!editing);
      return;
    } else {
      console.log(clientDetails[attribute]);
      axios
        .put(
          "http://localhost:3001/api/coach/clients/update/" + userDetails.id,
          {
            traineeId,
            goal: clientDetails[attribute],
          }
        )
        .then(({ data }) => {
          let temp = [...clients].filter((client) => client.id !== traineeId);
          temp.push(data);
          temp.sort((a, b) => a.id - b.id);
          setClients(temp);

          setEditing(!editing);
        })
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <div className="editable-input">
      <label>{attribute.split("_").join(" ") + ": "}</label>
      {editing ? (
        <input
          type="number"
          min={0}
          defaultValue={value === "no value" ? 0 : value}
          onChange={(e) => setClientDetails({ [attribute]: e.target.value })}
        />
      ) : value ? (
        <b>{`${value} ${
          value !== "no value"
            ? attribute === "weight"
              ? "kg"
              : attribute === "daily_calorie_goal"
              ? "cal"
              : "cm"
            : ""
        }`}</b>
      ) : (
        <b>No Value</b>
      )}
      <button onClick={handleEdit}>{editing ? "SAVE" : "EDIT"}</button>
    </div>
  );
}

export default EditableInput;
