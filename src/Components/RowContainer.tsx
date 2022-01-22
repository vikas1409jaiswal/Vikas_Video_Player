import React, { useState } from 'react'
import BodyContainer from './BodyContainer';
import './RowContainer.css';

interface RowContainerProps{
    cardtitle: string[];
    currentSelectedFiles: any[];
    currentSelectedFileDetails: string[];
    isZoomedInPlayer: boolean;
}

const RowContainer : React.FunctionComponent<RowContainerProps> = (props) => {

    const [videoPlaying, setVideoPlaying] = useState(false);
    var playerSize : string = "col-sm-6";
    var rowHeight : number = 600;
    if (props.isZoomedInPlayer){
        playerSize = "col-sm-10";
        rowHeight= 2000;
    }

    return (
        <div className="row row-container-panel" style={{height: rowHeight}}>
            {props.cardtitle.map(ct =>
                <div className={playerSize}>
                    <BodyContainer cardtitle={ct}
                        currentSelectedFiles={props.currentSelectedFiles[parseInt(ct) - 1]}
                        isVideoOpen={(iO) => { setVideoPlaying(iO) }}
                        isVideoPlaying={videoPlaying}
                        currentSelectedFileDetails={props.currentSelectedFileDetails[parseInt(ct) - 1]}
                        isZoomedInPlayer={props.isZoomedInPlayer} />
                </div>)}
        </div>
    )
}

export default RowContainer
