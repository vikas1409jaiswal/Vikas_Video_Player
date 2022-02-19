import React, { useState, useEffect, useContext } from 'react';
import { PlayerPosition, SoccerContext } from '../../SoccerHomePage';
import { useCountries } from '../../SoccerHooks/useCountries';
import { SoccerPlayer, useWikipediaByCountry, useWikipediaBySoccerPlayer } from '../../SoccerHooks/useWikipedia';
import { getPlayersIds } from './../../SoccerConstants/SoccerPlayerIds';
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

    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<SelectedPlayerIndex>({ selectedFW: 0, selectedMF: 0, selectedDF: 0, selectedGK: 0 });

    const soccerPlayers = useWikipediaByCountry(useCountries().filter(c => c.id === soccerContext.countryId)[0]?.name);


    console.log(selectedPlayerIndex,'Index');

    let player: SoccerPlayer = soccerPlayers.currentSquad.filter(p => p.playerId === getPlayersIds(soccerPlayers).FW[0])[0];

    useEffect(() => {
        if (soccerContext.selectedPlayerPosition === PlayerPosition.forward) {
            setSelectedPlayerId(getPlayersIds(soccerPlayers).FW[selectedPlayerIndex.selectedFW]);
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder) {
            setSelectedPlayerId(getPlayersIds(soccerPlayers).MF[selectedPlayerIndex.selectedMF]);
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.defender) {
            setSelectedPlayerId(getPlayersIds(soccerPlayers).DF[selectedPlayerIndex.selectedDF]);
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper) {
            setSelectedPlayerId(getPlayersIds(soccerPlayers).GK[selectedPlayerIndex.selectedGK]);
        }

    }, [selectedPlayerIndex, soccerContext.selectedPlayerPosition, soccerContext.countryId]);

    useEffect(() => {
        setSelectedPlayerIndex({ selectedFW: 0, selectedMF: 0, selectedDF: 0, selectedGK: 0 });
    }, [soccerContext.countryId])

    if (selectedPlayerId?.match('CS')) {
        player = soccerPlayers.currentSquad.filter(p => p.playerId === selectedPlayerId).pop() as SoccerPlayer;
    }
    if (selectedPlayerId?.match('RCU')) {
        player = soccerPlayers.recentCallUps.filter(p => p.playerId === selectedPlayerId).pop() as SoccerPlayer;
    }
    
    return (
        <>
            <div className='soccer-home-page-body'>
                <PlayerDetails player={player}
                    soccerPlayers={soccerPlayers}
                    selectedPlayerIndex={selectedPlayerIndex}
                    setSelectedPlayerindex={setSelectedPlayerIndex} />
            </div>
        </>
    );
};

