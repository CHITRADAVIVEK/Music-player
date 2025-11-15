import React from "react";

export default function ProgressBar({
  currentTime,
  duration,
  onSeek
}) {
  // Convert to mm:ss
  const format = (sec) => {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="progress-section">
      <input
        type="range"
        className="progress-bar"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(e.target.value)}
      />

      <div className="time-display">
        <span>{format(currentTime)}</span>
        <span>{format(duration)}</span>
      </div>
    </div>
  );
}
