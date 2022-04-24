import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export interface ApiResponse {
  data: string;
  status: number;
  config: any;
  headers: any;
  request: any;
  statusText: string;
}

export interface Carreer {
  matches: string | undefined;
  goals: string | undefined;
}

export interface AdditionalInfo {
  fullName: string | null | undefined;
  imagePath: string | null | undefined;
  birthPlace: string;
  height: string | undefined;
  positions: string | undefined;
}

export interface SoccerPlayer {
  playerId: string;
  playerName: string | null | undefined;
  dateOfBirth: string | null | undefined;
  position: string | undefined;
  clubName: string | undefined;
  clubNationFlag: string | null | undefined;
  InternationlCarreer: Carreer;
  detailsPageUrl: string | null | undefined;
  additionalInformation: AdditionalInfo | null;
}

export interface TeamInformation {
    confederation: string;
    headCoach: string;
    captain: string;
    mostCaps: string;
    topScorer: string;
    jersey: string[];
}

export interface SoccerPlayers {
  teamNationalLogo: string | null;
  teamNationalFlag: string;
  teamInformation: TeamInformation;
  currentSquad: SoccerPlayer[];
  recentCallUps: SoccerPlayer[];
}

export interface HeadToHead {
  opponentFlagUrl: string;
  opponent: string;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  goalsFor: string;
  goalsAgainst: string;
}

export interface FootBallTeamRecord {
  teamLogoUrl: string;
  headToHeadRecord: HeadToHead[];
}


export interface HeadToHeadMatch {
  date: string;
  match: string;
  result: string;
  score: string;
  competition: string;
}


const fetchWikipediaByTeam = (countryName: string): Promise<AxiosResponse<string>> => {
  if (countryName === 'United States') {
    return axios.get('https://en.wikipedia.org/wiki/United_States_men%27s_national_soccer_team');
  }

if (countryName === 'Canada') {
    return axios.get('https://en.wikipedia.org/wiki/Canada_men%27s_national_soccer_team');
  }

  return axios.get(`https://en.wikipedia.org/wiki/${countryName}_national_football_team`);
};

const fetchWikipediaByFifaTeam = (countryName: string): Promise<AxiosResponse<string>> => {

  const countryModifiedName = countryName.indexOf(' ') !== -1 ? countryName.replace(' ', '-').replace(' ', '-') : countryName;

  return axios.get(`https://www.11v11.com/teams/${countryModifiedName.toLowerCase()}/tab/stats/`);
};

const fetchHeadToHeadMatches = (teamName: string, oppositionTeamName: string): Promise<AxiosResponse<string>> => {

  //const countryModifiedName = countryName.indexOf(' ') !== -1 ? countryName.replace(' ', '-').replace(' ', '-') : countryName;

  return axios.get(`https://www.11v11.com/teams/${teamName.toLowerCase()}/tab/opposingTeams/opposition/${oppositionTeamName}/`);
};

const fetchWikipediaByPlayer = (url: any): Promise<AxiosResponse<string>> => {
  return axios.get(`https://en.wikipedia.org/${url}`);
};

const fetchCountry = (country: string): Promise<AxiosResponse<string>> => {
  return axios.get(`https://en.wikipedia.org/wiki/${country}`);
};

export const useWikipediaByCountry = (countryName: string): SoccerPlayers => {

  const { data } = useQuery(['wikipedia', countryName], () => fetchWikipediaByTeam(countryName), { cacheTime: 60 * 10 * 10 });

  const countryInfo = useQuery(['country-info', countryName], () => fetchCountry(countryName), { cacheTime: 60 * 10 * 10 });

  const divElement = document.createElement('div');

  const divElement2 = document.createElement('div');

  divElement.innerHTML = data?.data.toString() as string;

  divElement2.innerHTML = countryInfo?.data?.data.toString() as string;

  console.log(divElement2);

  const tableRowsSelector = divElement.querySelectorAll('table > tbody > tr.nat-fs-player');
  const currentSquadTable = tableRowsSelector[0]?.parentNode;
  const recentCallUpsTable = tableRowsSelector[tableRowsSelector.length - 1]?.parentNode;

  console.log(currentSquadTable);

  let playersName = currentSquadTable?.querySelectorAll('tr.nat-fs-player > th > a');
  const playersDOB = currentSquadTable?.querySelectorAll('tr.nat-fs-player span.bday');
  const playerClubName = currentSquadTable?.querySelectorAll('tr.nat-fs-player td:nth-last-child(1) > a');
  const playerClubNationFlag = currentSquadTable?.querySelectorAll('tr.nat-fs-player span.flagicon > a > img');
  const playerPosition = currentSquadTable?.querySelectorAll('tr.nat-fs-player td:nth-child(2) > a');
  const playerMatches = currentSquadTable?.querySelectorAll('tr.nat-fs-player td:nth-child(5)');
  const playerGoals = currentSquadTable?.querySelectorAll('tr.nat-fs-player td:nth-child(6)');

  let recentPlayersName = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player > th > a');
  const recentPlayersDOB = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player span.bday');
  const recentPlayerClubName = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player td:nth-last-child(2) > a');
  const recentPlayerClubNationFlag = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player span.flagicon > a > img');
  const recentPlayerPosition = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player td:nth-child(1) > a');
  const recentPlayerMatches = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player td:nth-child(4)');
  const recentPlayerGoals = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player td:nth-child(5)');

  const infoBoxImageSelector = divElement.querySelectorAll('td.infobox-image > a > img');
  const flagSelector = divElement2.querySelectorAll('td.infobox-image  img');
  const infoBoxDataSelector = divElement.querySelectorAll('td.infobox-data');
  const jerseySelector = divElement.querySelectorAll('td.toccolours');

  if (['Australia', 'Bulgaria', 'Algeria', 'Nigeria', 'Haiti', 'United States'].indexOf(countryName) != -1) {
    playersName = currentSquadTable?.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
    if (['Nigeria', 'Algeria'].indexOf(countryName) === -1) {
      recentPlayersName = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
    }
    }

    let confederation: string = '';
    let headCoach: string = '';
    let captain: string = '';
    let mostCaps: string = '';
    let topScorer: string = '';

    for (let i = 0; i < infoBoxDataSelector?.length; i++) {
        const headerSelector = infoBoxDataSelector?.item(i)?.parentNode?.querySelectorAll('th')?.item(0)?.textContent;
        const tdSelector = infoBoxDataSelector?.item(i)?.textContent as string;

        if (headerSelector === 'Confederation') {
            confederation = tdSelector;
        }

        if (headerSelector === 'Head coach') {
            headCoach = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Captain') {
            captain = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Most caps') {
            mostCaps = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Top scorer') {
            topScorer = tdSelector.split('[')[0];
        }
    }

  const players: SoccerPlayers = {
    teamNationalLogo: infoBoxImageSelector.item(0)?.getAttribute('src'),
      teamNationalFlag: flagSelector.item(0)?.getAttribute('src') as string,
      teamInformation: {
          confederation,
          headCoach,
          captain,
          mostCaps,
          topScorer,
          jersey: [
              jerseySelector?.item(0)?.querySelectorAll('td')?.item(0)?.innerHTML,
              jerseySelector?.item(0)?.querySelectorAll('td')?.item(1)?.innerHTML,
              jerseySelector?.item(0)?.querySelectorAll('td')?.item(2)?.innerHTML
          ]
      },
    currentSquad: [],
    recentCallUps: []
  };

  for (let i = 0; i < (playersName?.length || 0); i++) {
    players.currentSquad.push({
      playerId: `0002_CS_${i+1}`,
      dateOfBirth: playersDOB?.item(i)?.textContent,
      playerName: playersName?.item(i)?.textContent,
      clubName: playerClubName?.item(i)?.innerHTML,
      clubNationFlag: playerClubNationFlag?.item(i)?.getAttribute('src'),
      position: playerPosition?.item(i)?.innerHTML,
      InternationlCarreer: {
        matches: playerMatches?.item(i)?.innerHTML.replace('\n',''),
        goals: playerGoals?.item(i)?.innerHTML.replace('\n', '')
      },
      detailsPageUrl: playersName?.item(i).getAttribute('href'),
      additionalInformation: null
    });
  }

  for (let i = 0; i < (recentPlayersName?.length || 0); i++) {
    players.recentCallUps.push({
      playerId: `0002_RCU_${i + 1}`,
      dateOfBirth: recentPlayersDOB?.item(i)?.textContent,
      playerName: recentPlayersName?.item(i)?.textContent,
      clubName: recentPlayerClubName?.item(i)?.innerHTML,
      clubNationFlag: recentPlayerClubNationFlag?.item(i)?.getAttribute('src'),
      position: recentPlayerPosition?.item(i)?.innerHTML,
      InternationlCarreer: {
        matches: recentPlayerMatches?.item(i)?.innerHTML.replace('\n', ''),
        goals: recentPlayerGoals?.item(i)?.innerHTML.replace('\n', '')
      },
      detailsPageUrl: recentPlayersName?.item(i).getAttribute('href'),
      additionalInformation: null
    });
  }

    console.log(players);

  return players;
};

export const useWikipediaBySoccerPlayer = (player: SoccerPlayer, playerList: SoccerPlayer[]) => {

  const { data } = useQuery(['wikipedia', player?.detailsPageUrl], () => fetchWikipediaByPlayer(player?.detailsPageUrl));

  const divElement = document.createElement('div');

  divElement.innerHTML = data?.data.toString() as string;

  const infoBoxSelector = divElement.querySelectorAll('table.infobox > tbody');
  const birthPlace = infoBoxSelector?.item(0)?.querySelectorAll('td.birthplace > a');
  const playerFullName = infoBoxSelector?.item(0)?.querySelectorAll('td.nickname');
  const imagePath = infoBoxSelector?.item(0)?.querySelectorAll('td.infobox-image > a > img');
  const infoLabels = infoBoxSelector?.item(0)?.querySelectorAll('th.infobox-label');
  let height: string | null | undefined = '';
  let positions: string | undefined = '';
  let fullName: string | null | undefined = '';

  for (let i = 0; i < infoLabels?.length; i++) {
    if (infoLabels.item(i).innerHTML === 'Height') {
      height = infoLabels[i].parentNode?.querySelector('td.infobox-data')?.textContent;
      height = height?.replace('&nbsp;', '').replace('&nbsp;', '').replace('&nbsp;', '');
      height = height?.slice(height?.lastIndexOf('}') + 1, height.lastIndexOf(')') + 1);
    }

    if (infoLabels.item(i).innerHTML === 'Position(s)') {
      positions = infoLabels[i].parentNode?.querySelector('td.infobox-data > a')?.innerHTML;
    }
  }

  fullName = playerFullName?.item(0)?.textContent;
  fullName = fullName?.indexOf('[') != -1 ? fullName?.slice(0, fullName?.lastIndexOf('[')) : fullName;

  const playerIndex = playerList.map(p => p.playerId).indexOf(player?.playerId);

  playerList[playerIndex] = {
    ...player,
    additionalInformation: {
      fullName: fullName,
      birthPlace: birthPlace?.item(0)?.innerHTML,
      imagePath: imagePath?.item(0)?.getAttribute('src'),
      height: height,
      positions: positions
    }
  };

  return playerList[playerIndex];
};

export const useWikipediaByFootballTeam = (teamName: string) => {

  const { data } = useQuery(
    ['wikipedia-team-records', teamName],
    () => fetchWikipediaByFifaTeam(teamName), {
      cacheTime: 30000
    });

  const divElement = document.createElement('div');

  divElement.innerHTML = data?.data.toString() as string;

  const teamLogoSelector = divElement.querySelectorAll('td.infobox-image > a > img');
  const headToHeadTableSelector = divElement.querySelectorAll('tr');

  const headToHead: HeadToHead[] = [];

  for (let i = 0; i < (headToHeadTableSelector as NodeListOf<Element>)?.length; i++) {
    const tdSelector = headToHeadTableSelector?.item(i)?.querySelectorAll('td');
    const opponent = tdSelector?.item(0)?.textContent;

    headToHead.push({
      opponentFlagUrl: '',
      opponent: opponent as string,
      played: tdSelector?.item(1)?.textContent as string,
      won: tdSelector?.item(2)?.textContent as string,
      drawn: tdSelector?.item(3)?.textContent as string,
      lost: tdSelector?.item(4)?.textContent as string,
      goalsFor: tdSelector?.item(5)?.textContent as string,
      goalsAgainst: tdSelector?.item(6)?.textContent as string
    });
  }

  const teamRecord: FootBallTeamRecord = {
    teamLogoUrl: teamLogoSelector.item(0)?.getAttribute('src') as string,
    headToHeadRecord: headToHead
  };

  console.log(teamRecord);

  console.log(teamRecord.headToHeadRecord);

  return teamRecord;
};

export const useHeadToHeadMatches = (teamName: string, oppositionTeamName: string): HeadToHeadMatch[] => {

  const { data } = useQuery(
    ['head-to-head-matches', teamName, oppositionTeamName],
    () => fetchHeadToHeadMatches(teamName, oppositionTeamName), {
      cacheTime: 30000
    });

  const divElement = document.createElement('div');

  divElement.innerHTML = data?.data.toString() as string;

  const headToHeadTableSelector = divElement.querySelectorAll('table').item(1)?.querySelectorAll('tr');

  const headToHeadMatches: HeadToHeadMatch[] = [];

  for (let i = 1; i < (headToHeadTableSelector as NodeListOf<Element>)?.length; i++) {
    const tdSelector = headToHeadTableSelector?.item(i)?.querySelectorAll('td');

    headToHeadMatches.push({
      date: tdSelector?.item(0)?.textContent as string,
      match: tdSelector?.item(1)?.textContent as string,
      result: tdSelector?.item(2)?.textContent as string,
      score: tdSelector?.item(3)?.textContent as string,
      competition: tdSelector?.item(4)?.textContent as string,
    });
  }

  console.log(headToHeadMatches);

  return headToHeadMatches;
};