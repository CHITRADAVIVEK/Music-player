import Controls from "./components/Controls";
<Controls
  isPlaying={isPlaying}
  onPlayPause={handlePlayPause}
  onNext={handleNext}
  onPrevious={handlePrevious}
  disablePrev={currentIndex === 0 && !isPlaying}
  disableNext={currentIndex === playlist.length - 1 && !isPlaying}
/>
