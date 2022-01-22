import React from 'react';
import './BodyContainer.css';
import CardContainer from './CardContainer';
import CardFooterContainer from './CardFooterContainer';
import CardHeaderContainer from './CardHeaderContainer';

interface BodyContainerProps{
    cardtitle: string;
    currentSelectedFiles: any;
    isVideoOpen: (isOpen: boolean) => void;
    isVideoPlaying: boolean;
    currentSelectedFileDetails: string;
    isZoomedInPlayer: boolean;
}

const BodyContainer : React.FunctionComponent<BodyContainerProps> = (props) => {
    return (
        <>
            <div className="card-body-container">
                <div className="card-header-plate">
                    <CardHeaderContainer cardtitle={props.cardtitle} currentSelectedFiles={props.currentSelectedFiles} />
                </div>
                <div className="card-plate">
                    <CardContainer currentSelectedFiles={props.currentSelectedFiles}
                        isVideoPlaying={props.isVideoPlaying}
                        currentSelectedFileDetails={props.currentSelectedFileDetails}
                        isZoomedInPlayer={props.isZoomedInPlayer} />
                </div>
                <div className="card-footer-plate">
                    <CardFooterContainer isVideoopen={props.isVideoOpen} />
                </div>
            </div>
        </>
    )
}

export default BodyContainer
