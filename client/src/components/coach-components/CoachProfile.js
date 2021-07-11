import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import EditableInput from "../EditableInput";
import { SetErrorContext } from "../../App";
import userPic from "../../pics/user1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

function CoachProfile({ userDetails, alertMessage }) {
  const [clientsNumber, setClientsNumber] = useState();
  const [render, setRender] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const setError = useContext(SetErrorContext);

  async function getNumberOfClients() {
    try {
      let clients = await axios.get(
        "/api/coach/clients/show/" + userDetails.id
      );
      return clients.data.length;
    } catch (err) {
      return [];
    }
  }
  useEffect(() => {
    if (alertMessage === "New Alert") setRender(!render);
  }, [alertMessage]);

  useEffect(async () => {
    if (!userDetails) return;
    setClientsNumber(await getNumberOfClients());
  }, [userDetails, render]);

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
                        className="profile-image"
                      />
                      <div className="mt-3">
                        <h2>{userDetails.name}</h2>
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
                      <h6 className="mb-0">Phone Number:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.phone_number}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.city}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Experties:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.expertise}
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">online coaching: </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userDetails.online_coaching === "true" ? "Yes" : "No"}
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
                    <div>Number of Trainees:{clientsNumber}</div>
                    {/* <button className="edit-button">
                      {editMode ? "Save" : "Edit"}
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body forms">
                    <div>
                      {/* <a href={pdf} target="_blank" className="pdf-btn">
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          color="white"
                          className="fa-fa"
                        />
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="coach-info"></div>
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

export default CoachProfile;
