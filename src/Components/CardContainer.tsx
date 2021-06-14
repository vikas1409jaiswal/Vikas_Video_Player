import React from 'react';
import './CardContainer.css';
import CardVideoPlayer from './CardVideoPlayer';
import ReactVideoPlayer from './ReactVideoPlayer';

interface CardContainerProps{
  currentSelectedFiles: any;
  isVideoPlaying: boolean;
  currentSelectedFileDetails: string;
  isZoomedInPlayer: boolean;
}

const CardContainer : React.FunctionComponent<CardContainerProps> = (props) => {
    return (
        <div className="card-container">
           <CardVideoPlayer isVideoPlaying={props.isVideoPlaying}
                             currentSelectedFiles={props.currentSelectedFiles}
                             currentSelectedFileDetails={props.currentSelectedFileDetails}
                             isZoomedInPlayer={props.isZoomedInPlayer}/>
        </div>
    )
}

export default CardContainer
