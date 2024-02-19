import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    const lastPlayedTrackIndex = localStorage.getItem('lastPlayedTrackIndex');
    if (lastPlayedTrackIndex) {
      setCurrentTrackIndex(parseInt(lastPlayedTrackIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastPlayedTrackIndex', currentTrackIndex.toString());
  }, [currentTrackIndex]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const updatedPlaylist = [];
    for (let i = 0; i < files.length; i++) {
      updatedPlaylist.push(URL.createObjectURL(files[i]));
    }
    setPlaylist(updatedPlaylist);
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
    if (audioElement) {
      audioElement.play();
    }
  };

  const handlePause = () => {
    if (audioElement) {
      audioElement.pause();
    }
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div className='centered-container'>
      <input type="file" multiple onChange={handleFileUpload} />
      <div className='audio'>
        <audio src={playlist[currentTrackIndex]} controls ref={(element) => setAudioElement(element)} onEnded={handleEnded}/>
        <div className='btn'>
          <button onClick={handlePlay.bind(null, currentTrackIndex)}>Play</button>
          <button onClick={handlePause}>Pause</button>
        </div>
      </div>
      <div>
        {playlist.map((track, index) => (
          <div key={index}>
            <button onClick={() => handlePlay(index)}>Play</button>
            <span>{`Track ${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
