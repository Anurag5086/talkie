import React from 'react'
import PausePlayerIconSVG from '../svg-resources/pause-player-icon'
import PlayIconSVG from '../svg-resources/play-player-icon'
import './styles/button.css'

function Button(props) {
  return (
    <div className="button_container">
        {props.isPlaying?
          <div onClick={props.play}>
            <PlayIconSVG />
          </div>
          :
          <div onClick={props.play}>
            <PausePlayerIconSVG />
          </div>
        }
    </div>
  )
}
export default Button