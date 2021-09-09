import React, { useState, useRef, useEffect } from 'react'
import { ReactMic } from 'react-mic'
import Player from './Player';
import RecordingMicSVG from '../svg-resources/recording-mic-icon'
import PauseIconSVG from '../svg-resources/pause-icon'
import './styles/PlayerCard.css'

function PlayerCard() {
    const [audioData, setAudioData] = useState();
    const [currentStatus, setCurrentStatus] = useState("Start");
    const [timer, setTimer] = useState(0)
    const increment = useRef(null)

    useEffect(() => {
        if(timer === 30){
            stopRecording()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer])

    const startRecording = () => {
      setCurrentStatus("Recording")
      handleStart()
    }
  
    const stopRecording = () => {
      setCurrentStatus("Recording Paused")
      handleStop()
    }

    const audioPlayingTimer = (time) => {
        setTimer(time)
    }

    const setRecordingStatusPlaying = () => {
        setCurrentStatus("Recording Playing")
    }

    const sendButtonHandleSubmit = () => {
        console.log('RecordedBlob is: ', audioData);
    }
  
    const onStop = (recordedBlob) => {
        setAudioData(recordedBlob);
    }

    const handleStart = () => {
        increment.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleStop = () => {
        clearInterval(increment.current)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)

        return `${getMinutes}:${getSeconds}`
    }

    return (
        <div className="container">
            <div onClick={startRecording} className="record_icon_container">
                <RecordingMicSVG />
            </div>

            <div className="top_section_player">

                <div className="left_section">
                    <p className="start_text">{currentStatus}</p>
                    <p className="timer_section">
                        <span className="play_time">{formatTime()}</span>
                        <span className="fixed_time">/ 00:30</span>
                    </p>
                </div>

                <div className="right_section">
                    {currentStatus === "Recording"?
                        <div 
                        onClick={stopRecording} 
                        className="pause_button"
                        >
                            <PauseIconSVG />
                        </div> 
                        : null
                    }
                    <button 
                    onClick={sendButtonHandleSubmit} 
                    className=
                        {
                        currentStatus === "Recording Paused" || currentStatus === "Recording Playing"? 
                        "send_btn_paused":"send_btn_play"
                        }
                    >
                        <span className="btn_text">Send</span>
                    </button>
                </div>
            </div>
            
            <div className="bottom_section">
                {audioData?
                    <div>
                        <Player 
                            audioURL={audioData.blobURL} 
                            setRecordStatusPlaying={setRecordingStatusPlaying} 
                            audioPlayingTimer={audioPlayingTimer}
                        />
                    </div>
                    : 
                    <ReactMic
                        record={currentStatus === "Recording"}
                        strokeColor="#B721FF"
                        className="wave"
                        onStop={onStop}
                        backgroundColor="#061732"
                        timeSlice={10000}
                    />
                }
            </div>
        </div>
    )
}

export default PlayerCard
