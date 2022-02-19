import React, { useState, createContext } from 'react';
import { SoccerHeader } from './SoccerComponents/SoccerHeader/SoccerHeader';
import { SoccerBody } from './SoccerComponents/SoccerBody/SoccerBody';
import { SoccerFooter } from './SoccerComponents/SoccerFooter/SoccerFooter';

import './SoccerHomePage.css';
import { Thumbnail } from './ThumbnailComponents/Thumbnail';

export interface SoccerHomePageProps {
}

interface SoccerContextValue {
    countryId: number;
    setCountryId: (id: number) => void;
    selectedPlayerPosition: PlayerPosition;
    setSelectedPlayerPosition: (position: PlayerPosition) => void;
}

export enum PlayerPosition {
    none= 'None',
    forward = 'Forward',
    midFielder = 'MidFielder',
    defender = 'Defender',
    goalKeeper = 'GoalKeeper'
}

const initialSoccerContextValue = {
    countryId: 0,
    setCountryId: () => { },
    selectedPlayerPosition: PlayerPosition.none,
    setSelectedPlayerPosition: () => { }
}
export const SoccerContext = createContext<SoccerContextValue>(initialSoccerContextValue);

export const SoccerHomePage: React.FunctionComponent<SoccerHomePageProps> = (props) => {

    const [countryId, setCountryId] = useState(2);
    const [selectedPlayerPosition, setSelectedPlayerPosition] = useState<PlayerPosition>(PlayerPosition.forward);

    const isThumbnail = false;

    return (
        <>
            <SoccerContext.Provider value={{
                countryId: countryId,
                setCountryId: setCountryId,
                selectedPlayerPosition: selectedPlayerPosition,
                setSelectedPlayerPosition: setSelectedPlayerPosition
            }}>
            <div className='soccer-home-page'>
                <SoccerHeader />
                {isThumbnail ? <Thumbnail/> : <SoccerBody />}
                {!isThumbnail && <SoccerFooter />}
             </div>
             </SoccerContext.Provider>
        </>
    );
};
