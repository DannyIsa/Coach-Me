import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function AddExercise({ userDetails }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [types, setTypes] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const history = useHistory();
  const storage = firebase.storage();

  function join(major, minor) {
    if (minor === major || !minor) return major;
    return major + "," + minor;
  }

  useEffect(() => {
    axios
      .get("/api/coach/exercises/tags")
      .then(({ data }) => {
        setTypes(data.types);
        setEquipments(data.equipments);
        setMuscles(data.muscles);
      })
      .catch((err) => setErrorMessage(err.response.data));
  }, []);
  return (
    <div className="add-exercise-start">
      <h1>Exercise Adding</h1>
      {types && equipments && muscles ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const dataObj = {
              name: data.get("name"),
              muscle: join(data.get("major-muscle"), data.get("minor-muscle")),
              type: join(data.get("major-type"), data.get("minor-type")),
              image: data.get("image"),
              description: data.get("description"),
              equipment: join(
                data.get("major-equipment"),
                data.get("minor-equipment")
              ),
            };
            dataObj.name = dataObj.name
              .split(" ")
              .map((val) => val[0].toUpperCase() + val.slice(1, val.length))
              .join(" ");
            if (!dataObj.muscle) {
              setErrorMessage("Major Muscle Required");
              return;
            }
            if (!dataObj.type) {
              setErrorMessage("Major Type Required");
              return;
            }
            if (!dataObj.equipment) {
              setErrorMessage("Major Equipment Required");
              return;
            }
            if (
              dataObj.image.name !== "" &&
              !dataObj.image.name.endsWith(".jpg") &&
              !dataObj.image.name.endsWith(".png") &&
              !dataObj.image.name.endsWith(".gif")
            ) {
              setErrorMessage("File Type needs to be jpg/png/gif");
              return;
            }
            if (dataObj.image.name !== "") {
              await storage.ref(dataObj.image.name).put(dataObj.image);
              const url = await storage
                .ref()
                .child(dataObj.image.name)
                .getDownloadURL();
              if (!url) {
                setErrorMessage("Couldn't upload image");
                return;
              }
              dataObj.image = url;
            } else dataObj.image = "";
            axios
              .post("/api/coach/exercise/add", { exercise: dataObj })
              .then(() => {
                history.push("/profile");
              })
              .catch((err) => setErrorMessage(err.response.data));
          }}
        >
          <label htmlFor="name">Exercise name:</label>
          <input name="name" placeholder="Enter Exercise Name" required />

          <label htmlFor="major-muscle">Major Muscle:</label>
          <select name="major-muscle" required>
            <option disabled selected>
              Select Major Muscle
            </option>
            {muscles.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="minor-muscle">Minor Muscle:</label>
          <select name="minor-muscle">
            <option disabled selected>
              Select Minor Muscle
            </option>
            {muscles.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="image">Image:</label>
          <input type="file" name="image" accept=".jpg,.png,.gif" />

          <label htmlFor="major-type">Major Type:</label>
          <select name="major-type" required>
            <option disabled selected>
              Select Major Type
            </option>
            {types.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="minor-type">Minor Type:</label>
          <select name="minor-type">
            <option disabled selected>
              Select Minor Type
            </option>
            {types.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="major-equipment">Major Equipment:</label>
          <select name="major-equipment" required>
            <option disabled selected>
              Select Major Equipment
            </option>
            {equipments.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="minor-equipment">Minor Equipment:</label>
          <select name="minor-equipment">
            <option disabled selected>
              Select Minor Equipment
            </option>
            {equipments.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Enter Description"
          ></textarea>

          <input type="submit" />
        </form>
      ) : (
        "Loading"
      )}
      <h1 className="error-message">{errorMessage}</h1>
    </div>
  );
}

export default AddExercise;
