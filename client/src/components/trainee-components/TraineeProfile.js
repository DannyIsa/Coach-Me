import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import pdf from "../../documents/health_declaration.pdf";
import EditableInput from "../EditableInput";
import { SetErrorContext } from "../../App";
import userPic from "../../pics/user1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

function TraineeProfile({ userDetails, setUserDetails }) {
  const [measureLogs, setMeasureLogs] = useState({});
  const [editMode, setEditMode] = useState(false);
  const setError = useContext(SetErrorContext);
  const [coach, setCoach] = useState();
  const [leavePopup, setLeavePopup] = useState(false);
  const [image, setImage] = useState();
  const [uploadingImage, setUploadingImage] = useState();
  const storage = firebase.storage();

  const getData = () => {
    axios
      .get("/api/logs/measure/show/latest/" + userDetails.id)
      .then(async ({ data }) => {
        setMeasureLogs(data);
        axios
          .get("/api/trainee/coach/show/" + userDetails.id)
          .then(({ data }) => setCoach(data))
          .catch((err) => setError(err.response.data));
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const updateMeasurements = () => {
    if (!editMode) {
      setEditMode(!editMode);
      return;
    } else {
      axios
        .post("http://localhost:3001/api/logs/measure/add", {
          id: userDetails.id,
          height: measureLogs.height ? measureLogs.height : userDetails.height,
          weight: measureLogs.weight ? measureLogs.weight : userDetails.weight,
          chestPerimeter: measureLogs.chest_perimeter,
          hipPerimeter: measureLogs.hip_perimeter,
          bicepPerimeter: measureLogs.bicep_perimeter,
          thighPerimeter: measureLogs.thigh_perimeter,
          waistPerimeter: measureLogs.waist_perimeter,
        })
        .then((res) => {
          setMeasureLogs(res.data);
          setEditMode(!editMode);
        })
        .catch((err) => setError(err.response.data));
    }
  };

  useEffect(() => {
    if (!userDetails) return;
    getData();
  }, [userDetails]);

  const leaveCoach = () => {
    axios
      .patch(
        `/api/trainee/coach/leave/${userDetails.id}?coachId=${userDetails.coach_id}`
      )
      .then(() => {
        setUserDetails({ ...userDetails, coach_id: 0 });
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setLeavePopup(false));
  };

  const updateImage = async () => {
    if (!image) return;
    if (
      image.name === "" ||
      (!image.name.endsWith(".jpg") &&
        !image.name.endsWith(".jpeg") &&
        !image.name.endsWith(".png"))
    )
      return;
    const uploadTask = storage.ref(image.name).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadingImage(
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (err) => {
        setError(err.message);
        setUploadingImage();
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          try {
            console.log(downloadURL);
            const { data } = await axios.put(
              "/api/user/image/change/" + userDetails.id,
              { userType: "Trainee", image: downloadURL }
            );
            setUserDetails(data);
            setUploadingImage();
          } catch (err) {
            setError(err.response.data);
            setUploadingImage();
          }
        });
      }
    );
  };

  return (
    <div className="profile-container">
      {userDetails ? (
        <div className="main-body">
          {leavePopup && (
            <div className="pop-up">
              <div className="pop-up-leave">
                <h1>Leave Coach</h1>
                <h2>Are you sure you want to leave your coach?</h2>
                <h3>All data will be deleted.</h3>
                <button onClick={leaveCoach}>Yes</button>
                <button onClick={() => setLeavePopup(false)}>No</button>
              </div>
            </div>
          )}
          <div className="main1">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="mt-3">
                        <h2>{userDetails.name}</h2>
                      </div>
                      <img
                        src={
                          userDetails.image !== "" ? userDetails.image : userPic
                        }
                        alt=""
                        onError={(e) => {
                          setError("Couldn't Load Image");
                          e.target.onError = null;
                          e.target.src = userPic;
                        }}
                        className="profile-image"
                      />
                      <label htmlFor="image">{`Updat${
                        uploadingImage ? "ing" : "e"
                      } Profile Picture`}</label>
                      {!uploadingImage ? (
                        <>
                          <input
                            type="file"
                            name="image"
                            accept=".jpg,.jpeg,.png,"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <button onClick={updateImage}>
                            <FontAwesomeIcon
                              icon={faUpload}
                              color="#333"
                              className="fa-fa"
                            />
                          </button>
                        </>
                      ) : (
                        <progress value={uploadingImage} max={100} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <h2>Personal info:</h2>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of Birth:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.birthdate}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Calorie Goal:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.daily_calorie_goal}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone Number:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">0526726267</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Activity Level: </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.activity_level}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          <div className="main2">
            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    {/* <div>x */}
                    <button
                      className="edit-button"
                      onClick={updateMeasurements}
                    >
                      {editMode ? "Save" : "Edit"}
                    </button>
                    <h2>Body Measurments:</h2>
                    <EditableInput
                      value={
                        measureLogs && measureLogs.height
                          ? measureLogs.height
                          : userDetails.height
                      }
                      attribute={"height"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.weight
                          ? measureLogs.weight
                          : userDetails.weight
                      }
                      attribute={"weight"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.chest_perimeter
                          ? measureLogs.chest_perimeter
                          : "no value"
                      }
                      attribute={"chest_perimeter"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.hip_perimeter
                          ? measureLogs.hip_perimeter
                          : "no value"
                      }
                      attribute={"hip_perimeter"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.bicep_perimeter
                          ? measureLogs.bicep_perimeter
                          : "no value"
                      }
                      attribute={"bicep_perimeter"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.waist_perimeter
                          ? measureLogs.waist_perimeter
                          : "no value"
                      }
                      attribute={"waist_perimeter"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                    <EditableInput
                      value={
                        measureLogs && measureLogs.thigh_perimeter
                          ? measureLogs.thigh_perimeter
                          : "no value"
                      }
                      attribute={"thigh_perimeter"}
                      editing={editMode}
                      state={measureLogs}
                      setState={setMeasureLogs}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body forms">
                    <h2>Forms To Fill Out:</h2>
                    <div>daily general update</div>
                    <div>
                      health declaration
                      <a href={pdf} target="_blank" className="pdf-btn">
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          color="#333"
                          className="fa-fa"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  {coach ? (
                    <div className="coach-info">
                      <img src={coach.image} alt="" className="profile-image" />
                      <h2>My Coach: </h2>
                      <p>
                        Name: <span>{coach ? coach.name : ""}</span>
                      </p>
                      <p>
                        Email: <span>{coach ? coach.email : ""}</span>
                      </p>
                      <p>
                        Phone Number:
                        <span>{coach ? coach.phone_number : ""} </span>
                      </p>
                      <p>
                        Date Of Birth:
                        <span>{coach ? coach.birthdate : ""} </span>
                      </p>
                      <p>
                        Gender: <span>{coach ? coach.gender : ""}</span>
                      </p>
                      <p>
                        City: <span>{coach ? coach.city : ""} </span>
                      </p>
                      <p>
                        Expertise : <span>{coach ? coach.expertise : ""} </span>
                      </p>
                      <p>
                        Online Coaching :
                        <span>
                          {coach.online_coaching === "Yes" ? "Yes" : "No"}
                        </span>
                      </p>
                      <div className="coach-control-btn">
                        <a
                          className="chat-btn"
                          href={`/chat/${userDetails.id}/${userDetails.coach_id}`}
                        >
                          <button className="chat-btn">Chat</button>
                        </a>
                        <button
                          className="leave-btn"
                          onClick={() => setLeavePopup(true)}
                        >
                          Leave
                        </button>
                      </div>
                      <h3>
                        Rate Your Coach : <span>rate</span>
                      </h3>
                    </div>
                  ) : (
                    <div className="coach-info">
                      <h3>No Coach Found</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TraineeProfile;
