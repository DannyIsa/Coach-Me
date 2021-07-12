import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SetErrorContext } from "../../App";
import { debounce } from "lodash";
function ClientCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { traineeId } = useParams();
  const [field, setField] = useState({ day: null, type: null });
  const [results, setResults] = useState([]);
  const [chosen, setChosen] = useState();
  const [chosenItems, setChosenItems] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [foodAmount, setFoodAmount] = useState(1);
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (userDetails && traineeId) {
      axios
        .get(
          `http://localhost:3001/api/food/need-to-eat/${userDetails.id}?traineeId=${traineeId}`
        )
        .then(({ data }) => {
          setNeedToEat(data);
          axios
            .get(
              `http://localhost:3001/api/trainee/workouts/show/${userDetails.id}?traineeId=${traineeId}`
            )
            .then(({ data }) => {
              setWorkouts(data);
            })
            .catch((err) => {
              setError(err.response.data);
            });
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!field || !userDetails) return;
    if (field.type === "Workout") {
      axios
        .get(`/api/coach/workouts/show/${userDetails.id}?value=${searchInput}`)
        .then(({ data }) => {
          setResults(data);
        })
        .catch((err) => {
          setResults([]);
          setChosen();
          setError(err.response.data);
        });
    } else {
      axios
        .get(`/api/food/get-food?searchedFood=${searchInput}`)
        .then(({ data }) => {
          setResults(data);
        })
        .catch((err) => {
          setResults([]);
          setChosen();
          setError(err.response.data);
        });
    }
  }, [searchInput, field]);

  const handleSearch = useCallback(
    debounce((e) => {
      setSearchInput(e.target.value);
    }, 700)
  );

  useEffect(() => {
    if (!field) return;
    if (field.type === "Workout") {
      const item = [...workouts].find((workout) => workout.day === field.day);
      setChosenItems(item);
    } else {
      const items = [...needToEat].filter(
        (food) => food.meal_of_the_day === field.type && food.day === field.day
      );
      setChosenItems(items);
    }
  }, [field]);
  const addItem = async () => {
    const dataToSend = {
      traineeId,
      day: field.day,
      type: field.type,
      valueId: chosen.id,
      amount: foodAmount,
    };
    try {
      const res = await axios.put(
        "/api/coach/client/calendar/" + userDetails.id,
        dataToSend
      );
      if (dataToSend.type === "Workout") {
        let temp = [...workouts].filter(
          (workout) => workout.day !== res.data.day
        );
        temp.push(res.data);
        setChosenItems(res.data);
        setWorkouts(temp);
      } else {
        let temp = [...needToEat];
        temp = temp.filter(
          (food) =>
            (food.day !== res.data.day &&
              food.meal_of_the_day !== res.data.meal_of_the_day) ||
            food.food_id !== res.data.food_id
        );
        temp.push(res.data);
        setNeedToEat(temp);
        temp = temp.filter(
          (food) =>
            food.day === res.data.day &&
            food.meal_of_the_day === res.data.meal_of_the_day
        );
        setChosenItems(temp);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  const removeItem = async (itemId) => {
    axios
      .patch("/api/coach/client/calendar/" + userDetails.id, {
        traineeId,
        day: field.day,
        type: field.type,
        valueId: itemId,
      })
      .then(({ data }) => {
        if (field.type === "Workout") {
          let temp = [...workouts].filter(
            (workout) => workout.day !== data.day
          );
          setChosenItems();
          setWorkouts(temp);
        } else {
          let temp = [...needToEat].filter(
            (food) =>
              (food.day !== data.day &&
                food.meal_of_the_day !== data.meal_of_the_day) ||
              food.food_id !== data.food_id
          );
          setNeedToEat(temp);
          temp = temp.filter(
            (food) =>
              food.day === data.day &&
              food.meal_of_the_day === data.meal_of_the_day
          );
          setChosenItems(temp);
        }
      })
      .catch((err) => setError(err.response.data));
  };

  const Meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const DaysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="weekly-calendar start">
      <table className="table">
        <thead>
          <tr>
            {DaysOfTheWeek.map((day, index) => (
              <td key={index}>
                <h2>{day}</h2>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Meals.map((meal, mi) => (
            <tr key={mi}>
              {DaysOfTheWeek.map((day, di) => {
                let items = needToEat.filter(
                  (foodToEat) =>
                    foodToEat.day === day && foodToEat.meal_of_the_day === meal
                );
                return (
                  <td
                    key={di}
                    onClick={() => {
                      setChosen();
                      setSearchInput("");
                      setFoodAmount(1);
                      setField({ type: meal, day });
                    }}
                    className={
                      field.day === day && field.type === meal ? "chosen" : ""
                    }
                  >
                    {meal +
                      " " +
                      items.map((item) =>
                        item ? "\n" + item.name + " X" + item.amount : ""
                      )}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            {DaysOfTheWeek.map((day, index) => {
              let item = workouts.find((workout) => workout.day === day);
              return (
                <td
                  className={
                    field.day === day && field.type === "Workout"
                      ? "chosen"
                      : ""
                  }
                  key={index}
                  onClick={() => {
                    setChosen();
                    setSearchInput("");
                    setFoodAmount(1);
                    setField({ type: "Workout", day });
                  }}
                >
                  {"Workout" + (item ? ":\n" + item.name : "")}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      {field.type && (
        <div className="popup-background">
          <div className="popup-content">
            <button
              onClick={() => setField({ day: null, type: null })}
              className="close-popup-button"
            >
              CLOSE
            </button>
            <div className="search-div">
              <h1 className="workout-name">
                {field.day + " " + field.type + ": "}
              </h1>
              <input
                placeholder="Search Food"
                className="search-input"
                onChange={handleSearch}
              />
              <div className="results">
                {results.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setFoodAmount(1);
                      setChosen(item);
                    }}
                    className={chosen && chosen.id === item.id ? "chosen" : ""}
                  >
                    {item.name}
                    <br />
                  </div>
                ))}
              </div>
            </div>
            {field.type === "Workout" && chosen && (
              <div className="details-div">
                <h1 className="workout-name">{chosen.name}</h1>
                <ol>
                  {chosen.exercises.map((item, index) => (
                    <li className="exercise-block" key={index}>
                      <h2 className="exercise-name">{item.name}</h2>
                      <h3 className="exercise-details">{`${item.min_reps} ${
                        item.min_reps !== item.max_reps
                          ? "-" + item.max_reps
                          : ""
                      } reps, rest for ${item.rest}s ${
                        item.added_weight > 0
                          ? "+" + item.added_weight + "kg "
                          : ""
                      }X${item.sets}`}</h3>
                    </li>
                  ))}
                </ol>
                <h1>{"X" + chosen.sets}</h1>
                <button className="popup-add-button-workout" onClick={addItem}>
                  Add
                </button>
              </div>
            )}
            {field.type !== "Workout" && chosen && (
              <div className="details-div">
                <h4>
                  {chosen.name} ({chosen.weight * foodAmount}g)
                </h4>
                <p>{chosen.calories * foodAmount} calories</p>
                <p>{chosen.protein * foodAmount} protein</p>
                <p>{chosen.carbs * foodAmount} carbs</p>
                <p>{chosen.fats * foodAmount} fats</p>
                <div>
                  <label htmlFor="amount">amount:</label>
                  <input
                    className="popup-amount-input"
                    name="amount"
                    type="number"
                    value={foodAmount}
                    onChange={(e) => {
                      setFoodAmount(Math.abs(e.target.value));
                    }}
                  />
                </div>
                <br />
                <button className="popup-add-button" onClick={addItem}>
                  Add
                </button>
              </div>
            )}
            {/* <div className="chosen-calendar-div">
              {chosenItems &&
                (chosenItems.exercises ? (
                  <>
                    <h1 className="workout-name">
                      {field.day + ": " + chosenItems.name}
                    </h1>
                    <ol>
                      {chosenItems.exercises.map((item, index) => (
                        <li className="exercise-block" key={index}>
                          <h2 className="exercise-name">{item.name}</h2>
                          <h3 className="exercise-details">{`${item.min_reps} ${
                            item.min_reps !== item.max_reps
                              ? "-" + item.max_reps
                              : ""
                          } reps, rest for ${item.rest}s ${
                            item.added_weight > 0
                              ? "+" + item.added_weight + "kg "
                              : ""
                          }X${item.sets}`}</h3>
                        </li>
                      ))}
                    </ol>
                    <h1>{"X" + chosenItems.sets}</h1>
                    <button onClick={() => removeItem(1)}>Remove</button>
                  </>
                ) : (
                  <div className="popup-chosen-food">
                    <h1>{field.day + " " + field.type + ": "}</h1>
                    <ol>
                      {chosenItems.map((item) => (
                        <li>
                          <h4>
                            {item.name} ({item.weight * item.amount}g)
                          </h4>
                          <p>{item.calories * item.amount} calories</p>
                          <p>{item.protein * item.amount} protein</p>
                          <p>{item.carbs * item.amount} carbs</p>
                          <p>{item.fats * item.amount} fats</p>
                          <br />
                          <button onClick={() => removeItem(item.id)}>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default ClientCalendar;
