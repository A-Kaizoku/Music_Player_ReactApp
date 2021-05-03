import React, { useState } from "react";

//Import Styles
import "./styles/app.scss";

//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

//Importing utils
import data from "./components/util"; //i am writing data here but it doesnt exist in util so by default chillHop function will be called

function App() {
  //state

  //const [songs, setSongs] = useState(data());
  const [songs] = useState(data()); //if I console log data() , then we'll receive the array of objects we defined in util
  //hence after the above code songs will be an array having the data of chillHop function's objects
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
