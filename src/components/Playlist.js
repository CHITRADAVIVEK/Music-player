import React from "react";

export default function Playlist({ playlist, currentIndex, onSelect, onRemove }) {
  return (
    <div className="playlist">
      <h3>Playlist</h3>

      {playlist.length === 0 && <p>No songs added yet.</p>}

      {playlist.map((song, index) => (
        <div
          key={index}
          className={`playlist-item ${index === currentIndex ? "active" : ""}`}
          onClick={() => onSelect(index)}
        >
          <span>{index + 1}. {song.name}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
