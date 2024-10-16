import React, { useRef, useState } from 'react';

export default function CustomTimePicker() {
  const [time, setTime] = useState('');
  const timeInputRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const currentTime = getCurrentTime();
  const handleIconClick = () => {
    timeInputRef.current.showPicker();
  };

  return (
    <div className="position-relative" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="time"
        style={{ height: "40px", paddingRight: "40px" }}
        className="form-control px-4"
        placeholder="Pickup Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onClick={(e) => {
            if(!e.target.value) setTime(currentTime)}
        }
        ref={timeInputRef}
      />
      <i
        className="fa fa-clock position-absolute"
        style={{
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#3A3A3A",
          cursor: "pointer",
        }}
        onClick={handleIconClick}
      />
    </div>
  );
}
