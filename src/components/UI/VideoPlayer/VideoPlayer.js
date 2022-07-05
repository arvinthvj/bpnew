import React from 'react';
import {
    Player,
    BigPlayButton,
    LoadingSpinner,
    ControlBar,
    PlaybackRateMenuButton,
    ReplayControl,
    ForwardControl,
    VolumeMenuButton,
    TimeDivider,
    CurrentTimeDisplay,
    DurationDisplay
} from 'video-react';
import 'video-react/dist/video-react.css';
import './VideoPlayer.css';

const videoPlayer = props => {
    return (
        <Player
            // playsInline
            width="100%"
            height="100%"
            // autoPlay
            preload="metadata"
            className={props.className ? `custom_video_player_container ${props.className}` : "custom_video_player_container"}
            poster={props.videoPoster}>
            <source src={props.videoURL} />
            <BigPlayButton position="center" />
            <LoadingSpinner />
            {
                props.controlBar
                    ? <ControlBar>
                        <ReplayControl className="d-sm-block d-none" seconds={10} order={2.2} />
                        <ForwardControl className="d-sm-block d-none" seconds={10} order={3.2} />
                        <VolumeMenuButton vertical />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                    </ControlBar>
                    : <ControlBar>
                        {/* <PlayToggle /> */}
                        <TimeDivider className="hide_timer" />
                        <CurrentTimeDisplay className="hide_timer" />
                        <DurationDisplay className="hide_timer" />
                        <VolumeMenuButton vertical />
                    </ControlBar>
            }
        </Player>
    );
}

export default videoPlayer