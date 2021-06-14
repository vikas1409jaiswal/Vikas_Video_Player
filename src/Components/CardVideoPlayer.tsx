import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './CardVideoPlayer.css';

interface CardVideoPlayerProps{
  isVideoPlaying: boolean;
  currentSelectedFiles: any;
  currentSelectedFileDetails: string;
  isZoomedInPlayer : boolean;
}

const CardVideoPlayer : React.FunctionComponent<CardVideoPlayerProps> = (props) => {
    
    const [videoFilePath, setvideoFilePath] = useState('');

    const playVideoUpload = () => {
        setvideoFilePath(URL.createObjectURL(props.currentSelectedFiles[0]));
    }

    return (
        <div className='player-wrapper'>
            {
                props.isVideoPlaying?playVideoUpload():null
            }
            <ReactPlayer
               className='react-player video-player-box'
               url={props.currentSelectedFileDetails}
               width="100%"
               height={props.isZoomedInPlayer?400:250}
               controls = {true}              
            />
        </div>
    )
}

export default CardVideoPlayer
