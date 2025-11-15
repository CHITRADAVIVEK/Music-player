import React from "react";

export default function VolumeControl({ volume, onVolumeChange }) {
  return (
    <div className="volume-section">
      <span className="vol-icon">🔊</span>

      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={(e) => onVolumeChange(e.target.value / 100)}
        className="volume-slider"
      />

      <span className="vol-value">{Math.round(volume * 100)}%</span>
    </div>
  );
}
