import React, { useState } from 'react';
import './CardFooterContainer.css';

interface CardFooterContainerProps{
  isVideoopen: (isOpen: boolean) => void;
}

const CardFooterContainer : React.FunctionComponent<CardFooterContainerProps> = (props) => {

    const [isVideoOpen, setisVideoOpen] = useState(false);

    const openVideo = () => {
      setisVideoOpen(true);
      props.isVideoopen(isVideoOpen);
    }

    return (
        <div className="card-footer-container">
            <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-2">
                     <button className="btn btn-primary play-button" onClick={openVideo}>Play</button>
                </div>
                <div className="col-sm-2">
                     <button className="btn btn-success pause-button">Pause</button>
                </div>      
            </div>
        </div>
    )
}

export default CardFooterContainer
