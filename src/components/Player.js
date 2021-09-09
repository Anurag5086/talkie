import React, { useState, useRef } from 'react'
import Slider from './Slider'
import Button from './Button'

function Player(props) {
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 1
    props.setRecordStatusPlaying();

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    
    props.audioPlayingTimer(Math.floor(e.currentTarget.currentTime))
    setPercentage(+percent)
  }

  return (
    <div style={{marginTop: '20px'}}>
      
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        src={props.audioURL}
      ></audio>
      <Button play={play} isPlaying={isPlaying}/>
      
    </div>
  )
}

export default Player