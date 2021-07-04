import React, { useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

// export default function Hello() {
//   return <DayPicker />;
// }

export default function DaySelect({ userDetails }) {
  const [selectedDay, setSelectedDay] = useState(new Date());

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
      .then(({ data }) => console.log({ data }))
      .catch((err) => console.log(err));
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
