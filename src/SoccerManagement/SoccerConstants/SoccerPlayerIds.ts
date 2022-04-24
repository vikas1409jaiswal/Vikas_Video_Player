import { SoccerPlayers, useWikipediaByCountry } from '../SoccerHooks/useWikipedia';

export type PlayerIds = {
  FW: string[];
  MF: string[];
  DF: string[];
  GK: string[];
};

export const getPlayersIds = (playerslist: SoccerPlayers) => {

  let playersIds: PlayerIds = {
    FW: [],
    MF: [],
    DF: [],
    GK: []
  };

  const getPlayerIdsByPosition = (position: string): string[] => {
    let playerIdsByPosition: string[] = [];
    playerIdsByPosition = [...playerslist.currentSquad.filter(p => p.position === position).map(p => p.playerId), ...playerslist.recentCallUps.filter(p => p.position === position).map(p => p.playerId)];
    return playerIdsByPosition;
  };

  playersIds = {
    FW: getPlayerIdsByPosition('FW'),
    MF: getPlayerIdsByPosition('MF'),
    DF: getPlayerIdsByPosition('DF'),
    GK: getPlayerIdsByPosition('GK')
  };

  return playersIds;
};
