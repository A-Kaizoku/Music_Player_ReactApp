import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  //here i want to access html tag ...how can i do that?
  // first step:- const audio=document.querySelector('audio')  //this can be done in vanilla Js
  //second step:- using Reference

  //Ref
  const audioRef = useRef(null); //here null is the initial value
  //if we need to select an HTML tag from up here we can use reference

  //Event Handler
  const playSongHandler = () => {
    //console.log(audioRef.current); //need to read more about Ref
    //audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      //mathematical formula
    );
  };

  //Slider
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value; // used for seeking the audio according to the slider
    setSongInfo({ ...songInfo, currentTime: e.target.value }); //slider's sliding
  };

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
        {/* but here we encounter a problem like the duration iititally show 0.00 and updates itself when play button is clicked , to solve this we can use an event called onLoadedMetadata in the audio tag */}
      </div>

      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay} //play and pausing button toggling
        />

        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
