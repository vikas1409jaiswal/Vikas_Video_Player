import React from 'react';
import './CardHeaderContainer.css';

interface CardHeaderContainerProps{
    cardtitle: string;
    currentSelectedFiles: any;
}


const CardHeaderContainer : React.FunctionComponent<CardHeaderContainerProps> = (props) => {
    return (
        <>
        <div className="card-header-container">
            <h6 className="text-dark">{props.cardtitle}. {props.currentSelectedFiles}</h6>
        </div>
        </> 
    )
}

export default CardHeaderContainer
