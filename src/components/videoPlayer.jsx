import './videoPlayer.css';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { changeUrl } from '../redux/action';
import {AiOutlineSetting} from 'react-icons/ai';
import {MdSlowMotionVideo} from 'react-icons/md';
import * as Icons from 'react-bootstrap-icons';


export const VideoPlayer = () => {
  
  const url = useSelector((state)=>state.videoUrl);
  const dispatch = useDispatch();
  const videoRef = useRef(url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState();
  const [speed, setSpeed] = useState(1);
  const [speedPopUp, setSpeedPopUp] = useState(false);
  const [languagePopUp, setLanguagePopUp] = useState(false);
  const [audio, setAudio] = useState("hin");
  const [subtitle, setSubtitle] = useState("eng");

  const options = [
    { label: '0.25x' , value: '0.25' },
    { label: '0.5x' , value: '0.5' },
    { label: '1x(Normal)' , value: '1' },
    { label: '1.5x' , value: '1.5' },
    { label: '2x' , value: '2' }
  ];
  const options2 = [
    { label: 'Hindi' , value: 'hin' },
    { label: 'English' , value: 'eng' },
    { label: 'Japanese' , value: 'jap' },
  ];
  const options3 = [
    { label: 'Hindi' , value: 'hin' },
    { label: 'English' , value: 'eng' },
    { label: 'Japanese' , value: 'jap' },
  ];
  

  const duration = videoRef.current.duration;

  const handleBack = () =>{
    dispatch(changeUrl(""));
  }
  const handleShowSettings = () =>{
      setShowSettings(true)
  }
  const handleCloseSettings = () =>{
      setShowSettings(false)
  }
  useEffect(()=>{
    handlePlayPause();
  },[])

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } 
    else {
      video.play();
      setIsPlaying(true);
    }
  }
  const handleBackward = () => {
    videoRef.current.currentTime -= 20
    setCurrentTime(videoRef.current.currentTime - 2000)
  }
  const handleForward = () => {
    videoRef.current.currentTime += 20
    setCurrentTime(videoRef.current.currentTime + 2000)
  }
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  }
  const handleSeek = (e) => {
    const video = videoRef.current;
    const time = e.target.value;
    video.currentTime = time;
    setCurrentTime(time);
  }
  const handleMute =()=>{
    const video = videoRef.current;
    video.volume = 0;
    setVolume(0);
  }
  const handleUnmute =()=>{
    const video = videoRef.current;
    video.volume = 0.5;
    setVolume(0.5);
  }
  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const volume = e.target.value;
    video.volume = volume;
    setVolume(volume);
  }
  const handleFullScreen = () => {
    const video = videoRef.current;
    video.requestFullscreen();
  }

  const handleSpeedPopUp =()=>{
    setSpeedPopUp(true);
  }
  const handleCloseSpeedPopUp =()=>{
    setSpeedPopUp(false);
  }
  const handleLanguagePopUp =()=>{
    setLanguagePopUp(true);
  }
  const handleCloseLanguagePopUp =()=>{
    setLanguagePopUp(false);
  }
  const handleChangeSpeed = (e) => {
    videoRef.current.playbackRate = e.target.value;
  }
  const handleChangeAudio =(e) => {
    
  }
  const handleChangeSubtitle =(e) => {

  }

  return (
    <div className='main-container' onMouseEnter={handleShowSettings}  onMouseLeave={handleCloseSettings} >
      <div className='video-wrapper'>
        <video className='video'
            ref={videoRef}
            src={url}
            onTimeUpdate={handleTimeUpdate}
            onClick={handlePlayPause}
        /> 
      </div>

        {isPlaying ? null : <Icons.PlayCircleFill className='play-btn' onClick={handlePlayPause} />}            
        {showSettings ? 
          (
          <div className='video-settings'>
          <Icons.ArrowLeft className='back-btn' onClick={handleBack} />              
          <div className='video-details'>
            <p>Title</p>
            <p> {(Math.floor(currentTime/(60*60)%24)) > 0 ? (Math.floor(currentTime/(60*60)%24)) : "00"}
                :{(Math.floor(currentTime/60%60)) > 0 ? ("0"+Math.floor(currentTime/60%60)).slice(-2) : "00"}
                :{("0" + Math.floor(currentTime%60)).slice(-2)} 
              / 
                {(Math.floor(duration/(60*60)%24)) > 0 ? (Math.floor(duration/(60*60)%24)) : "00"}
                :{(Math.floor(duration/60%60)) > 0 ? ("0"+Math.floor(duration/60%60)).slice(-2) : "00"}
                :{("0" + Math.floor(duration%60)).slice(-2) > 0 ? ("0" + Math.floor(duration%60)).slice(-2) :"00"}
            </p>
          </div>

          <div className='video-seeker'>
            <input
                type="range"
                min={0}
                max={videoRef.current?.duration || 0}
                value={currentTime}
                onChange={handleSeek}
            />
          </div>

          <div className='video-btn'>
            <div className='left-btn-group'>
              {
                isPlaying ? <Icons.PauseCircle className='left-btn' onClick={handlePlayPause}/> 
                : <Icons.PlayCircle className='left-btn' onClick={handlePlayPause}/>
              }
              <Icons.SkipBackwardCircle className='left-btn' onClick={handleBackward}/> 
              <Icons.SkipForwardCircle className='left-btn' onClick={handleForward}/>
              {
                volume == 0
                ?<Icons.VolumeMute className='left-btn' onClick={handleUnmute}/>
                :<Icons.VolumeUp className='left-btn' onClick={handleMute}/>

              }
              
              <input className='volume'
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <div className='right-btn-group'>         
              <MdSlowMotionVideo className='right-btn' onMouseOver={handleSpeedPopUp}/>
              {
                speedPopUp ?
                (
                  <div className='speed-radio' onMouseLeave={handleCloseSpeedPopUp}>
                  {options.map((option) => (
                    <div className='speed-radio-row' key={option.value}>
                      <input
                        type="radio"
                        id={option.value}
                        name="options"
                        value={option.value}
                        checked={speed === option.value}
                        onChange={(e) =>{ setSpeed(option.value); handleChangeSpeed(e)}}
                      />
                      <label> {option.label} </label>
                    </div>
                  ))}                 
                  </div>
                )             
              :
              null
              }              
              <AiOutlineSetting className='right-btn' onMouseOver={handleLanguagePopUp} />
              {
                languagePopUp ?
                (
                  <div className='language-radio' onMouseLeave={handleCloseLanguagePopUp}>
                    <div className='audio-radio' >
                    <p>Audio</p>
                    {
                      options2.map((option2) => (
                      <div className='audio-col' key={option2.value}>
                        <input
                          type="radio"
                          id={option2.value}
                          name="options2"
                          value={option2.value}
                          checked={audio === option2.value}
                          onChange={(e) =>{ setAudio(option2.value);handleChangeAudio(e)}}
                        />
                        <label>{option2.label}</label>
                      </div>
                      ))
                    }                 
                    </div>
                    <div className='subtitle-radio'>
                      <p>Subtitle</p>
                      {
                        options3.map((option3) => (
                        <div className='subtitle-col' key={option3.value}>
                          <input
                            type="radio"
                            id={option3.value}
                            name="options3"
                            value={option3.value}
                            checked={subtitle === option3.value}
                            onChange={(e) =>{ setSubtitle(option3.value);handleChangeSubtitle(e)}}
                          />
                          <label>{option3.label}</label>
                        </div>
                        ))
                      }                 
                    </div>
                  </div>
                )
                :
                null
              }
              <Icons.Fullscreen className='right-btn' onClick={handleFullScreen} />
            </div>        
          </div>
        </div>
        )
        :
        null
      }      
    </div>
  )
}