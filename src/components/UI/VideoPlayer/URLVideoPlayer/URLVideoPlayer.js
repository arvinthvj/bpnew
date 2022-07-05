import React from 'react'
import ReactPlayer from 'react-player'
import '../VideoPlayer.css'

const urlVideoPlayer = props => {
    return (
        <div className="url_video_player" style={{ height: '100%' }}>
            <ReactPlayer
                width="100%"
                height="100%"
                playing={true}
                playIcon={<button className="url_video_player_paly_btn" type="button"><img src="/custom_images/play_icon_white.png" /></button>}
                light={true}
                className={props.className ? `custom_video_player_container ${props.className}` : "custom_video_player_container"}
                url={props.videoURL}
                controls={true} />
        </div>
    )
}

export default urlVideoPlayer