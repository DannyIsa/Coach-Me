import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import axios from "axios";
import { SetErrorContext } from "../../App";

function AddExercise({ userDetails }) {
  const [types, setTypes] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const storage = firebase.storage();
  const setError = useContext(SetErrorContext);

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
      .catch((err) => setError(err.response.data));
  }, []);
  return (
    <div className="add-exercise-start">
      <h1>Add New Exercise</h1>
      {types && equipments && muscles ? (
        <div className="add-exercise-form">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.target);
              const dataObj = {
                name: data.get("name"),
                muscle: join(
                  data.get("major-muscle"),
                  data.get("minor-muscle")
                ),
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
                setError("Major Muscle Required");
                return;
              }
              if (!dataObj.type) {
                setError("Major Type Required");
                return;
              }
              if (!dataObj.equipment) {
                setError("Major Equipment Required");
                return;
              }
              if (
                dataObj.image.name !== "" &&
                !dataObj.image.name.endsWith(".jpg") &&
                !dataObj.image.name.endsWith(".png") &&
                !dataObj.image.name.endsWith(".gif")
              ) {
                setError("File Type needs to be jpg/png/gif");
                return;
              }
              if (dataObj.image.name !== "") {
                await storage.ref(dataObj.image.name).put(dataObj.image);
                const url = await storage
                  .ref()
                  .child(dataObj.image.name)
                  .getDownloadURL();
                if (!url) {
                  setError("Couldn't upload image");
                  return;
                }
                dataObj.image = url;
              } else dataObj.image = "";
              axios
                .post("/api/coach/exercise/add", { exercise: dataObj })
                .then(({ data }) => {
                  setError(data);
                })
                .catch((err) => setError(err.response.data));
            }}
          >
            <div className="form-block">
              <h2 htmlFor="name" className="label-name">
                Exercise name:
              </h2>
              <input name="name" placeholder="Enter Exercise Name" required />
            </div>

            <div className="form-block">
              <h2 htmlFor="major-muscle" className="label-name">
                Major Muscle:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 htmlFor="minor-muscle" className="label-name">
                Minor Muscle:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 className="label-name" htmlFor="image">
                Image:
              </h2>
              <input type="file" name="image" accept=".jpg,.png,.gif" />
            </div>

            <div className="form-block">
              <h2 className="label-name" htmlFor="major-type">
                Major Type:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 className="label-name" htmlFor="minor-type">
                Minor Type:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 className="label-name" htmlFor="major-equipment">
                Major Equipment:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 className="label-name" htmlFor="minor-equipment">
                Minor Equipment:
              </h2>
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
            </div>

            <div className="form-block">
              <h2 className="label-name">Enter Description:</h2>
              <textarea
                name="description"
                placeholder="What to do in the exercise?"
                className="textarea-control"
              ></textarea>
            </div>

            <div className="form-block">
              <button type="submit" value="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AddExercise;
