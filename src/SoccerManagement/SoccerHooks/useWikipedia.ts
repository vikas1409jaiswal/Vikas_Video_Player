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
    matches: string | undefined,
    goals: string | undefined
}

export interface AdditionalInfo {
    fullName: string | null | undefined,
    imagePath: string | null | undefined,
    birthPlace: string,
    height: string | undefined,
    positions: string | undefined
}

export interface SoccerPlayer {
    playerId: string,
    playerName: string | null | undefined,
    dateOfBirth: string | null | undefined,
    position: string | undefined,
    clubName: string | undefined,
    clubNationFlag: string | null | undefined,
    InternationlCarreer: Carreer,
    detailsPageUrl: string | null | undefined,
    additionalInformation: AdditionalInfo | null
}

export interface SoccerPlayers {
    teamNationalLogo: string | null,
    currentSquad: SoccerPlayer[],
    recentCallUps: SoccerPlayer[]
}


const fetchWikipediaByTeam = (countryName: string): Promise<AxiosResponse<string>> => {
    return axios.get(`https://en.wikipedia.org/wiki/${countryName}_national_football_team`);
}

const fetchWikipediaByPlayer = (url: any): Promise<AxiosResponse<string>> => {
    return axios.get(`https://en.wikipedia.org/${url}`);
}

export const useWikipediaByCountry = (countryName: string): SoccerPlayers => {

    const { data } = useQuery(['wikipedia', countryName], () => fetchWikipediaByTeam(countryName));

    const divElement = document.createElement('div');

    divElement.innerHTML = data?.data.toString() as string;

    const tableRowsSelector = divElement.querySelectorAll('table > tbody > tr.nat-fs-player');
    const currentSquadTable = tableRowsSelector[0]?.parentNode;
    const recentCallUpsTable = tableRowsSelector[tableRowsSelector.length - 1]?.parentNode;

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

    if (['Australia', 'Bulgaria', 'Algeria', 'Nigeria', 'Haiti'].includes(countryName)) {
        playersName = currentSquadTable?.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
        recentPlayersName = recentCallUpsTable?.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
    }

    const players: SoccerPlayers = {
        teamNationalLogo: infoBoxImageSelector.item(0)?.getAttribute('src'),
        currentSquad: [],
        recentCallUps: []
    };

    for (let i = 0; i < (playersName?.length || 0); i++) {
        players.currentSquad.push({
            playerId: `0002_CS_${i+1}`,
            dateOfBirth: playersDOB?.item(i)?.textContent,
            playerName: playersName?.item(i)?.textContent,
            clubName: playerClubName?.item(i)?.innerHTML.replace('amp;',''),
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
            clubName: recentPlayerClubName?.item(i)?.innerHTML.replace('amp;',''),
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

    return players;
}

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
    fullName = fullName?.includes('[') ? fullName?.slice(0, fullName?.lastIndexOf('[')) : fullName;

    console.log(height);

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
    }

    console.log(playerList[playerIndex]);

    return playerList[playerIndex];
}