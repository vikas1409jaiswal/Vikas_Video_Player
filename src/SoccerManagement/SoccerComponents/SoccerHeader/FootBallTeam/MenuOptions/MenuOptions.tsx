import { motion, useAnimation } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { PlayerPosition, SoccerContext } from '../../../../SoccerHomePage';
import { Countries, useCountries } from '../../../../SoccerHooks/useCountries';
import { SoccerPlayer, useWikipediaByCountry } from '../../../../SoccerHooks/useWikipedia';

import './MenuOptions.css';

export interface MenuOptionsProps {

}

export const MenuOptions: React.FunctionComponent<MenuOptionsProps> = (props) => {
  const compareCountries = (a: Countries, b: Countries) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const comparePlayers = (a: SoccerPlayer, b: SoccerPlayer) => {
    if (a.playerName != null && b.playerName != null) {
      if (a.playerName < b.playerName) {
        return -1;
      }
      if (a.playerName > b.playerName) {
        return 1;
      }
    }
    return 0;
  };

  const countries = useCountries();

  const soccerContext = useContext(SoccerContext);

  const selectedCountryName = countries.filter(c => c.id === soccerContext.countryId)[0]?.name;

  const allPlayers = useWikipediaByCountry(selectedCountryName);

  const allPlayersList = [...allPlayers.currentSquad, ...allPlayers.recentCallUps];

  const selectedPlayerName = allPlayersList.filter(p => p.playerId === soccerContext.selectedPlayerId)[0]?.playerName;

  const handleCountryChange = (e: any) => {
    soccerContext.setCountryId(countries.filter(c => c.name === e.target.value)[0]?.id);
  };

  const handlePlayerChange = (e: any) => {
    const getPlayerPosition = (position: any) => {
      if (position === PlayerPosition.forward) {
        return PlayerPosition.forward;
      }
      if (position === PlayerPosition.midFielder) {
        return PlayerPosition.midFielder;
      }
      if (position === PlayerPosition.defender) {
        return PlayerPosition.defender;
      }
      if (position === PlayerPosition.goalKeeper) {
        return PlayerPosition.goalKeeper;
      }
      return PlayerPosition.none;
    };

    soccerContext.setSelectedPlayerId(allPlayersList.filter(p => p.playerName === e.target.value)[0]?.playerId);
    soccerContext.setSelectedPlayerPosition(getPlayerPosition(allPlayersList.filter(p => p.playerName === e.target.value)[0]?.position));
    soccerContext.setSelectedPlayerUsingDropdown(true);
  };

  const menuOptionsControl = useAnimation();

  useEffect(() => {
    menuOptionsControl.start({
      scale: [0.1, 1],
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    });
  }, []);

  return (
    <>
      <motion.div className='menu-options' animate={menuOptionsControl}>
        <div className='select-countries'>
          <label>{'Select Country'}</label>
          <select name="countries" value={selectedCountryName} onChange={handleCountryChange}>
            {countries.sort(compareCountries).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className='select-soccer-players'>
          <label>{'Select Players'}</label>
          <select name="players" value={(selectedPlayerName != null) ? selectedPlayerName :''} onChange={handlePlayerChange}>
            {allPlayersList.sort(comparePlayers).map(p => <option key={p.playerId} value={(p.playerName != null) ? p.playerName : ''}>{p.playerName}</option>)}
          </select>
        </div>
        <div className='select-advanced-options'>
          <div className='show-all-players'>
            <button onClick={() => { soccerContext.setShowAllPlayers(!soccerContext.showAllPlayers); }}>{soccerContext.showAllPlayers ? 'Hide All Players' : 'Show All Players'}</button>
          </div>
          <div>
            <button onClick={() => { soccerContext.setShowFifaRankings(!soccerContext.showFifaRankings); }}>{soccerContext.showFifaRankings ? 'Hide Fifa Rankings' : 'Show Fifa Rankings'}</button>
          </div>
          <div>
            <button onClick={() => { soccerContext.setShowTeamRecords(!soccerContext.showTeamRecords); }}>{soccerContext.showTeamRecords ? 'Hide Team Records' : 'Show Team Records'}</button>
          </div>
          <div>
            <button>{'Show'}</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

