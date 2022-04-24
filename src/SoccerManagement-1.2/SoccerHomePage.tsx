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
    selectedPlayerId: string;
    isSelectedPlayerUsingDropdown: boolean;
    showAllPlayers: boolean;
    selectedPlayerPosition: PlayerPosition;
    showFifaRankings: boolean;
    fifaRankingDetails: FifaTeamDetails[];
    showTeamRecords: boolean;
    setCountryId: (id: number) => void;
    setShowFifaRankings: (choice: boolean) => void;
    setSelectedPlayerId: (id: string) => void;
    setShowTeamRecords: (choice: boolean) => void;
    setFifaRankingDetails: (details: FifaTeamDetails[]) => void;
    setSelectedPlayerPosition: (position: PlayerPosition) => void;
    setSelectedPlayerUsingDropdown: (choice: boolean) => void;
    setShowAllPlayers: (choice: boolean) => void;
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
    setFifaRankingDetails: () => { },
    showTeamRecords: false,
    setShowTeamRecords: () => { }
}
export const SoccerContext = createContext<SoccerContextValue>(initialSoccerContextValue);

export const SoccerHomePage: React.FunctionComponent<SoccerHomePageProps> = (props) => {

    const [countryId, setCountryId] = useState(2);
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [selectedPlayerPosition, setSelectedPlayerPosition] = useState<PlayerPosition>(PlayerPosition.forward);
    const [isSelectedPlayerUsingDropdown, setSelectedPlayerUsingDropdown] = useState(false);
    const [showAllPlayers, setShowAllPlayers] = useState(false);
    const [showFifaRankings, setShowFifaRankings] = useState(false);
    const [showTeamRecords, setShowTeamRecords] = useState(false);
    const [fifaRankingDetails, setFifaRankingDetails] = useState<FifaTeamDetails[]>([]);

    return (
        <>
            <SoccerContext.Provider value={{
                countryId,
                setCountryId,
                selectedPlayerId,
                isSelectedPlayerUsingDropdown,
                showAllPlayers,
                showFifaRankings,
                fifaRankingDetails,
                showTeamRecords,
                setSelectedPlayerId,
                selectedPlayerPosition,
                setSelectedPlayerPosition,
                setSelectedPlayerUsingDropdown,
                setShowAllPlayers,
                setShowFifaRankings,
                setFifaRankingDetails,
                setShowTeamRecords,
            }}>
            <div className='soccer-home-page'>
                <SoccerHeader />
                    <SoccerBody />
                    {showAllPlayers || showFifaRankings || showTeamRecords ? null : <SoccerFooter />}
             </div>
             </SoccerContext.Provider>
        </>
    );
};
