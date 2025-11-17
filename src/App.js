import { useRef, useState, useEffect } from "react";
import Playlist from "./components/Playlist";
import Controls from "./components/Controls";

function App() {
  const audioRef = useRef(new Audio());
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = playlist[currentIndex];


 // Upload songs
const handleUpload = async (files) => {
  const newSongs = Array.from(files).map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name
  }));

  setPlaylist((prev) => {
    const updatedPlaylist = [...prev, ...newSongs];

    // If nothing was playing, start the first uploaded song
    if (updatedPlaylist.length > 0 && !isPlaying) {
      audioRef.current.pause();
      audioRef.current.src = updatedPlaylist[0].url;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
      setCurrentIndex(0);
    }

    return updatedPlaylist;
  });
};


  // Play or Pause
 const handlePlayPause = async () => {
  if (!currentSong) {
    alert("Please upload or select a song first");
    return;
  }

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Playback failed:", err);
    }
  }
};

useEffect(() => {
  if (currentSong && audioRef.current) {
    audioRef.current.src = currentSong.url;

    // Only attempt play if isPlaying was true
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.log("Play interrupted:", err);
      });
    }
  }
}, [currentIndex, currentSong]);


  // Next Song
const handleNext = async () => {
  if (currentIndex + 1 < playlist.length) {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    audioRef.current.pause();           // pause current audio
    audioRef.current.src = playlist[nextIndex].url;
    audioRef.current.load();            // reload audio
    try {
      await audioRef.current.play();    // safely play
      setIsPlaying(true);
    } catch (err) {
      console.log("Audio play error:", err);
    }
  }
};

// Previous Song
const handlePrevious = async () => {
  if (currentIndex > 0) {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    audioRef.current.pause();           // pause current audio
    audioRef.current.src = playlist[prevIndex].url;
    audioRef.current.load();            // reload audio
    try {
      await audioRef.current.play();    // safely play
      setIsPlaying(true);
    } catch (err) {
      console.log("Audio play error:", err);
    }
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
const onRemoveSong = async (index) => {
  const updated = playlist.filter((_, i) => i !== index);
  setPlaylist(updated);

  if (index === currentIndex) {
    const newIndex = 0;
    setCurrentIndex(newIndex);

    if (updated.length > 0) {
      audioRef.current.pause();             // pause current audio
      audioRef.current.src = updated[newIndex].url;
      audioRef.current.load();              // reload audio
      try {
        await audioRef.current.play();      // safely play
        setIsPlaying(true);
      } catch (err) {
        console.log("Audio play error:", err);
      }
    } else {
      setIsPlaying(false);
    }
  } else if (index < currentIndex) {
    // Adjust currentIndex if a previous song is removed
    setCurrentIndex((prev) => prev - 1);
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
