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

  async function sendRequest(coachId, traineeId) {
    //fix the api function for constant update
    axios
      .post(`/api/trainee/request/send/${traineeId}`, { coachId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Coaches:</h1>
      {coaches &&
        request &&
        coaches.map((item, index) => (
          <div className="coaches-item" key={"C" + index}>
            <h3>{item.email}</h3>
            {item.id === userDetails.coach_id ? (
              "Your Coach"
            ) : item.id === request.coach_id ? (
              "Request Pending"
            ) : (
              <button onClick={() => sendRequest(item.id, userDetails.id)}>
                Send Request
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
export default CoachesList;
