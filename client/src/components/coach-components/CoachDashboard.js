import React, { useContext } from "react";
import firebase from "firebase";
import axios from "axios";
import { SetErrorContext } from "../../App";

function CoachDashboard({ userDetails }) {
  // const storage = firebase.storage();
  // const setError = useContext(SetErrorContext);

  return (
    <div className="coach-dashboard">
      {userDetails ? (
        <>
          <h1>{`Hello Coach ${userDetails.name}`}</h1>
          {/* <div>upload a photo 📷</div> */}
          {/* <div className="add-coach-info-form">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                const dataObj = {
                  image: data.get("image"),
                };

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
                  .post("/api/coach/image/add", { image: dataObj })
                  .then(({ data }) => {
                    setError(data);
                  })
                  .catch((err) => setError(err.response.data));
              }}
            >
              <div className="form-block">
                <h2 className="label-name" htmlFor="image">
                  Image:
                </h2>
                <input type="file" name="image" accept=".jpg,.png,.gif" />
              </div>

              <div className="form-block">
                <button type="submit" value="submit">
                  <span></span>
                  Upload
                </button>
              </div>
            </form>
          </div> */}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default CoachDashboard;
