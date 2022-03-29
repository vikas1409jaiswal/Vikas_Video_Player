import React, { useState, createContext } from 'react';
import { SoccerHeader } from './SoccerComponents/SoccerHeader/SoccerHeader';
import { SoccerBody } from './SoccerComponents/SoccerBody/SoccerBody';
import { SoccerFooter } from './SoccerComponents/SoccerFooter/SoccerFooter';
import { FifaTeamDetails } from './SoccerHooks/useFifa';

import './SoccerHomePage.css';

export interface SoccerHomePageProps {
}

interface SoccerContextValue {
    countryId: number;
    setCountryId: (id: number) => void;
    selectedPlayerId: string;
    isSelectedPlayerUsingDropdown: boolean;
    showAllPlayers: boolean;
    setSelectedPlayerId: (id: string) => void;
    selectedPlayerPosition: PlayerPosition;
    setSelectedPlayerPosition: (position: PlayerPosition) => void;
    setSelectedPlayerUsingDropdown: (choice: boolean) => void;
    setShowAllPlayers: (choice: boolean) => void;
    showFifaRankings: boolean;
    setShowFifaRankings: (choice: boolean) => void;
    fifaRankingDetails: FifaTeamDetails[];
    setFifaRankingDetails: (details: FifaTeamDetails[]) => void;
}

export enum PlayerPosition {
    none= 'None',
    forward = 'FW',
    midFielder = 'MF',
    defender = 'DF',
    goalKeeper = 'GK'
}

const initialSoccerContextValue: SoccerContextValue = {
    countryId: 0,
    setCountryId: () => { },
    selectedPlayerId: '',
    isSelectedPlayerUsingDropdown: false,
    showAllPlayers: false,
    setSelectedPlayerId: () => {},
    selectedPlayerPosition: PlayerPosition.none,
    setSelectedPlayerPosition: () => { },
    setSelectedPlayerUsingDropdown: () => { },
    setShowAllPlayers: () => { },
    showFifaRankings: false,
    setShowFifaRankings: () => { },
    fifaRankingDetails: [],
    setFifaRankingDetails: () => { }
}
export const SoccerContext = createContext<SoccerContextValue>(initialSoccerContextValue);

export const SoccerHomePage: React.FunctionComponent<SoccerHomePageProps> = (props) => {

    const [countryId, setCountryId] = useState(2);
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [selectedPlayerPosition, setSelectedPlayerPosition] = useState<PlayerPosition>(PlayerPosition.forward);
    const [isSelectedPlayerUsingDropdown, setSelectedPlayerUsingDropdown] = useState(false);
    const [showAllPlayers, setShowAllPlayers] = useState(false);
    const [showFifaRankings, setShowFifaRankings] = useState(false);
    const [fifaRankingDetails, setFifaRankingDetails] = useState<FifaTeamDetails[]>([]);

    return (
        <>
            <SoccerContext.Provider value={{
                countryId: countryId,
                setCountryId: setCountryId,
                selectedPlayerId: selectedPlayerId,
                isSelectedPlayerUsingDropdown: isSelectedPlayerUsingDropdown,
                showAllPlayers: showAllPlayers,
                showFifaRankings,
                fifaRankingDetails,
                setSelectedPlayerId: setSelectedPlayerId,
                selectedPlayerPosition: selectedPlayerPosition,
                setSelectedPlayerPosition: setSelectedPlayerPosition,
                setSelectedPlayerUsingDropdown: setSelectedPlayerUsingDropdown,
                setShowAllPlayers: setShowAllPlayers,
                setShowFifaRankings,
                setFifaRankingDetails
            }}>
            <div className='soccer-home-page'>
                <SoccerHeader />
                <SoccerBody />
                {showAllPlayers||showFifaRankings ? null : <SoccerFooter />}
             </div>
             </SoccerContext.Provider>
        </>
    );
};
