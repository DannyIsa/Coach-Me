import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import pdf from "../../documents/health_declaration.pdf";
import EditableInput from "../EditableInput";
import { SetErrorContext } from "../../App";
import userPic from "../../pics/user1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

function TraineeProfile({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [measureLogs, setMeasureLogs] = useState({});
  const [editMode, setEditMode] = useState(false);
  const setError = useContext(SetErrorContext);
  const [coach, setCoach] = useState();

  const getData = () => {
    axios
      .get("http://localhost:3001/api/logs/measure/show/" + userDetails.id)
      .then(async ({ data }) => {
        if (data.length === 0) return;
        setMeasureLogs(data[data.length - 1]);
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
          height: measureLogs.height,
          weight: measureLogs.weight,
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

  return (
    <div className="profile-container">
      {userDetails ? (
        <div className="main-body">
          <div className="main1">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex">
                      <img
                        src={userDetails.image ? userDetails.image : userPic}
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>{userDetails.name}</h4>
                        {/* <p className="text-secondary mb-1">Full Stack Developer</p> */}
                        {/* <p className="text-muted font-size-sm">
                        Bay Area, Israel, CA
                      </p> */}
                        {/* <button className="btn btn-primary">Follow</button> */}
                        {/* <button className="btn btn-outline-primary">Message</button> */}
                      </div>
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
                      health declaration{" "}
                      <a href={pdf} target="_blank" className="pdf-btn">
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          color="white"
                          className="fa-fa"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body coach-info">
                    <h2>My Coach: </h2>
                    <h2>Name: {coach ? coach.name : ""} </h2>
                    <h2>Email: {coach ? coach.email : ""} </h2>
                    <h2>Phone Number: {coach ? coach.phone_number : ""} </h2>
                    {coach && <img src={coach.image} alt="" />}
                  </div>
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
