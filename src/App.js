import { useRef, useState, useEffect } from "react";
import Playlist from "./components/Playlist";
import Controls from "./components/Controls";

function App() {
  const audioRef = useRef(new Audio());
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Upload songs
  const handleUpload = (files) => {
    const newSongs = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPlaylist((prev) => [...prev, ...newSongs]);
  };

  // Play or Pause
  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!playlist.length) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Next Song
  const handleNext = () => {
    if (currentIndex + 1 < playlist.length) {
      setCurrentIndex((prev) => prev + 1);
      audioRef.current.src = playlist[currentIndex + 1].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Previous Song
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      audioRef.current.src = playlist[currentIndex - 1].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Auto-next when song finishes
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnd = () => {
      if (currentIndex + 1 < playlist.length) {
        setCurrentIndex((prev) => prev + 1);
        audio.src = playlist[currentIndex + 1].url;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, [currentIndex, playlist]);

  // Update audio source on index change
  useEffect(() => {
    if (playlist.length > 0) {
      audioRef.current.src = playlist[currentIndex].url;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentIndex]);

  // Playlist Select Song
  const onSelectSong = (index) => {
    setCurrentIndex(index);
    audioRef.current.src = playlist[index].url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Remove Song
  const onRemoveSong = (index) => {
    const updated = playlist.filter((_, i) => i !== index);
    setPlaylist(updated);

    if (index === currentIndex) {
      setCurrentIndex(0);
      if (updated.length > 0) {
        audioRef.current.src = updated[0].url;
        audioRef.current.play();
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="App">
      <h1>Music Player</h1>

      <input
        type="file"
        multiple
        accept="audio/*"
        onChange={(e) => handleUpload(e.target.files)}
      />

      <Playlist
        playlist={playlist}
        currentIndex={currentIndex}
        onSelectSong={onSelectSong}
        onRemoveSong={onRemoveSong}
      />

      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        disablePrev={currentIndex === 0}
        disableNext={currentIndex === playlist.length - 1}
      />
    </div>
  );
}

export default App;
