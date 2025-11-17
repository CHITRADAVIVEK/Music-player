import React from "react";

export default function Playlist({
  playlist,
  currentIndex,
  onSelectSong,
  onRemoveSong
}) {
  return (
    <div className="playlist-section">
      <div className="playlist-header">
        <h3>Playlist</h3>
        <div className="queue-info">{playlist.length} songs</div>
      </div>

      {playlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-text">No Songs</div>
          <div className="empty-hint">Upload MP3 files to begin</div>
        </div>
      ) : (
        <div className="playlist">
          {playlist.map((song, idx) => (
            <div
              key={idx}
              className={
                idx === currentIndex
                  ? "playlist-item active"
                  : "playlist-item"
              }
              onClick={() => onSelectSong(idx)}
            >
              <div className="song-index">{idx + 1}</div>

              <div className="song-title">{song.name}</div>

              <button
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation(); // stop triggering play
                  onRemoveSong(idx);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
