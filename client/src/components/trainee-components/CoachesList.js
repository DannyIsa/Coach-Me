import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-router-dom";

function CoachesList({ userDetails }) {
  const [coaches, setCoaches] = useState();
  const [request, setRequest] = useState();

  useEffect(async () => {
    if (!userDetails) return;
    let coachesData = (await axios.get("/api/coach/show/all")).data;
    setCoaches(coachesData);
    let requestData = (
      await axios.get("/api/trainee/request/show/" + userDetails.id)
    ).data;
    if (requestData) setRequest(requestData);
  }, [userDetails]);

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
        console.log(data);
        setRequest(data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
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
