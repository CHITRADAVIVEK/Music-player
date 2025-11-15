import Playlist from "./components/Playlist";
const [playlist, setPlaylist] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);

// Add song
const handleUpload = (files) => {
  const newSongs = Array.from(files).map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name
  }));

  setPlaylist((prev) => [...prev, ...newSongs]);
};

// Select from playlist
const onSelectSong = (index) => {
  setCurrentIndex(index);
  audioRef.current.src = playlist[index].url;
  audioRef.current.play();
};

// Remove song
const onRemoveSong = (index) => {
  const updated = playlist.filter((_, i) => i !== index);
  setPlaylist(updated);

  // if current removed → reset player
  if (index === currentIndex) {
    setCurrentIndex(0);
    if (updated.length > 0) {
      audioRef.current.src = updated[0].url;
      audioRef.current.play();
    }
  }
};
<Playlist
  playlist={playlist}
  currentIndex={currentIndex}
  onSelectSong={onSelectSong}
  onRemoveSong={onRemoveSong}
/>

