import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { SetErrorContext } from "../../App";
import {} from "react-router-dom";

function CoachesList({ userDetails, alertMessage }) {
  const [coaches, setCoaches] = useState();
  const [request, setRequest] = useState();
  const setError = useContext(SetErrorContext);

  useEffect(async () => {
    if (alertMessage) if (!alertMessage.startsWith("Request")) return;
    if (!userDetails) return;
    let coachesData = (await axios.get("/api/coach/show/all")).data;
    setCoaches(coachesData);
    let requestData = (
      await axios.get("/api/trainee/request/show/" + userDetails.id)
    ).data;
    if (requestData) setRequest(requestData);
  }, [userDetails, alertMessage]);

  function sendRequest(coachId, traineeId, traineeName) {
    const content = prompt("Enter Your Request Content");
    if (!content) return;
    axios
      .post(`/api/trainee/request/send/${traineeId}`, {
        coachId,
        traineeName,
        content,
      })
      .then(({ data }) => {
        setRequest(data);
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <div className="coaches-list">
      <h1>Coaches:</h1>
      {coaches && request
        ? coaches.map((item, index) => (
            <div className="coaches-item" key={"C" + index}>
              <h3>{item.name}</h3>
              {item.id === userDetails.coach_id ? (
                "Your Coach"
              ) : item.id === request.coach_id ? (
                "Request Pending"
              ) : (
                <button
                  onClick={() =>
                    sendRequest(item.id, userDetails.id, userDetails.name)
                  }
                >
                  Send Request
                </button>
              )}
            </div>
          ))
        : "Loading..."}
    </div>
  );
}
export default CoachesList;
