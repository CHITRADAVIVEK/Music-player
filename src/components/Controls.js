import React from "react";

export default function Controls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  disablePrev,
  disableNext
}) {
  return (
    <div className="controls">
      <button
        className="btn-control"
        onClick={onPrevious}
        disabled={disablePrev}
        title="Previous"
      >
        ⏮️
      </button>

      <button className="btn-play" onClick={onPlayPause} title="Play / Pause">
        {isPlaying ? "⏸️" : "▶️"}
      </button>

      <button
        className="btn-control"
        onClick={onNext}
        disabled={disableNext}
        title="Next"
      >
        ⏭️
      </button>
    </div>
  );
}
