import Playlist from "./components/Playlist";
<Playlist
  playlist={playlist}
  currentIndex={currentIndex}
  onSelect={(index) => playSong(index)}
  onRemove={(index) => removeSong(index)}
/>
