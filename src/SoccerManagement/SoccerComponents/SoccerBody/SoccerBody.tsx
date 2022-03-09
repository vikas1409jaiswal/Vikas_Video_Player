import React, { useState, useEffect, useContext } from 'react';
import { PlayerPosition, SoccerContext } from '../../SoccerHomePage';
import { useCountries } from '../../SoccerHooks/useCountries';
import { SoccerPlayer, useWikipediaByCountry, useWikipediaBySoccerPlayer } from '../../SoccerHooks/useWikipedia';
import { FifaTeamDetails, useFifaRankings } from '../../SoccerHooks/useFifa';
import { getPlayersIds } from './../../SoccerConstants/SoccerPlayerIds';
import { AllPlayersInfo } from './AllPlayersInfo/AllPlayersInfo';
import { FifaWorldRankings } from './FifaWorldRankings/FifaWorldRankings';
import { PlayerDetails } from './PlayerInfo/PlayerDetails';

import './SoccerBody.css';

export interface SoccerBodyProps {
}

export interface SelectedPlayerIndex {
    selectedFW: number;
    selectedMF: number;
    selectedDF: number;
    selectedGK: number;
}

export const SoccerBody: React.FunctionComponent<SoccerBodyProps> = (props) => {

    const soccerContext = useContext(SoccerContext);

    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<SelectedPlayerIndex>({ selectedFW: 0, selectedMF: 0, selectedDF: 0, selectedGK: 0 });

    const soccerPlayers = useWikipediaByCountry(useCountries().filter(c => c.id === soccerContext.countryId)[0]?.name);

    let player: SoccerPlayer = soccerPlayers.currentSquad.filter(p => p.playerId === getPlayersIds(soccerPlayers).FW[0])[0];

    useEffect(() => {
        if (!soccerContext.isSelectedPlayerUsingDropdown) {
            if (soccerContext.selectedPlayerPosition === PlayerPosition.forward) {
                soccerContext.setSelectedPlayerId(getPlayersIds(soccerPlayers).FW[selectedPlayerIndex.selectedFW]);
            }
            if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder) {
                soccerContext.setSelectedPlayerId(getPlayersIds(soccerPlayers).MF[selectedPlayerIndex.selectedMF]);
            }
            if (soccerContext.selectedPlayerPosition === PlayerPosition.defender) {
                soccerContext.setSelectedPlayerId(getPlayersIds(soccerPlayers).DF[selectedPlayerIndex.selectedDF]);
            }
            if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper) {
                soccerContext.setSelectedPlayerId(getPlayersIds(soccerPlayers).GK[selectedPlayerIndex.selectedGK]);
            }
        }

    }, [selectedPlayerIndex, soccerContext.selectedPlayerPosition, soccerContext.countryId]);

    useEffect(() => {
        setSelectedPlayerIndex({ selectedFW: 0, selectedMF: 0, selectedDF: 0, selectedGK: 0 });
    }, [soccerContext.countryId])

    if (soccerContext.selectedPlayerId?.match('CS')) {
        player = soccerPlayers.currentSquad.filter(p => p.playerId === soccerContext.selectedPlayerId).pop() as SoccerPlayer;
    }
    if (soccerContext.selectedPlayerId?.match('RCU')) {
        player = soccerPlayers.recentCallUps.filter(p => p.playerId === soccerContext.selectedPlayerId).pop() as SoccerPlayer;
    }
    
    return (
        <>

            {
                soccerContext.showAllPlayers &&
                    <div className='soccer-home-page-body-details'>
                        <AllPlayersInfo />
                    </div>
            }
            {
                soccerContext.showFifaRankings &&
                <div className='fifa-rankings-body'>
                    <FifaWorldRankings />
                </div>
            }
            {
                !soccerContext.showAllPlayers && !soccerContext.showFifaRankings &&
                <div className='soccer-home-page-body-detail'>
                    <PlayerDetails player={player}
                        soccerPlayers={soccerPlayers}
                        selectedPlayerIndex={selectedPlayerIndex}
                        setSelectedPlayerindex={setSelectedPlayerIndex} />
                </div>
            }
        </>
    );
};

