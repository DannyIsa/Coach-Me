import React, { useContext, useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import axios from "axios";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { SetErrorContext } from "../../App";

export default function DaySelect({ userDetails, setFoodOfSelectedDate }) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const setError = useContext(SetErrorContext);

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(selected ? undefined : day);
  };

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get(
        `/api/logs/diet/show/${userDetails.id}?day=${
          selectedDay.getDate() + 1
        }&month=${selectedDay.getMonth() + 1}&year=${selectedDay.getFullYear()}`
      )
      .then(({ data }) => {
        setFoodOfSelectedDate(data);
      })
      .catch((err) => {
        setError(err.response.data);
        setFoodOfSelectedDate([]);
      });
  }, [selectedDay, userDetails]);
  return (
    <>
      <div>
        <DayPicker
          showOutsideDays
          canChangeMonth={false}
          todayButton="Go to Today"
          modifiers={{
            foo: new Date(),
          }}
          onTodayButtonClick={(day, modifiers) => {
            setSelectedDay(day);
          }}
          onDayClick={handleDayClick}
        />
      </div>
      <p>{selectedDay ? selectedDay.toLocaleDateString() : "Today 👻"}</p>
    </>
  );
}
