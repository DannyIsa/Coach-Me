import React, { useContext, useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import axios from "axios";
import "react-day-picker/lib/style.css";
import { SetErrorContext } from "../../../App";

export default function DaySelect({
  userDetails,
  setFoodOfSelectedDate,
  selectedDay,
  setSelectedDay,
}) {
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

  const modifiers = {
    selectedDay,
  };
  const modifiersStyles = {
    selectedDay: {
      color: "white",
      backgroundColor: "#3bc528",
    },
  };

  return (
    <div>
      <DayPicker
        showOutsideDays
        className="day-picker"
        canChangeMonth={false}
        todayButton="Go to Today"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        onTodayButtonClick={(day) => {
          setSelectedDay(day);
        }}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
