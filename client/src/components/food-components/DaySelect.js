import React, { useState } from "react";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

// export default function Hello() {
//   return <DayPicker />;
// }

export default function DaySelect() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(selected ? undefined : day);
  };

  return (
    <>
      <div>
        <DayPicker
          showOutsideDays
          todayButton="Go to Today"
          modifiers={{
            foo: new Date(),
          }}
          onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
          onDayClick={handleDayClick}
        />
      </div>
      <p>
        {selectedDay
          ? selectedDay.toLocaleDateString()
          : "Please select a day 👻"}
      </p>
    </>
  );
}
