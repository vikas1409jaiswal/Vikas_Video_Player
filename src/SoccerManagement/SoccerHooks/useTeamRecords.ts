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

export interface ClubInformation {
    headCoach: string,
    founded: string,
    ground: string,
    capacity: string,
    president: string;
    jersey: string[];
}

export interface FifaTeamRecords {
  teamName: string;
  teamFlagUrl: string;
}

export interface ClubDetails {
    clubLogoUrl: string;
    clubInfo: ClubInformation;
}

export interface FootballClubInfo {
   clubName: string;
   clubPageUrl: string;
   clubDetails: ClubDetails | null;
}


const fetchTeams = (confederation: string): Promise<AxiosResponse<string>> => {
  return axios.get(`https://www.11v11.com/internationals/${confederation}-/}`);
};

const fetchFootballLeague = (leagueName: string): Promise<AxiosResponse<string>> => {
    return axios.get(`https://en.wikipedia.org/wiki/${leagueName}`);
};

const fetchFootballClub = (url: any): Promise<AxiosResponse<string>> => {
    return axios.get(`https://en.wikipedia.org/${url}`);
};

export const useTeams = (confedration: string) => {

  const queryOptions = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: true,
    retry: false,
  };

  const { data } = useQuery(['fifa-teams-by-confederation', confedration], () => fetchTeams(confedration), queryOptions);

  const divElement = document.createElement('div');

  divElement.innerHTML = data?.data.toString() as string;

  const teamsSelector = divElement.querySelectorAll('div.entry-content li > a');
  const teamsFlagSelector = divElement.querySelectorAll('div.entry-content li > a > img');

  const teamRecords: FifaTeamRecords[] = [];

  for (let i = 0; i < teamsSelector.length; i++) {
    teamRecords.push({
      teamName: teamsSelector?.item(i)?.textContent as string,
      teamFlagUrl: teamsFlagSelector?.item(i)?.getAttribute('src') as string,
    });
  }

  return teamRecords;
};

export const useFootballLeague = (leagueName: string): FootballClubInfo[] => {

    const queryOptions = {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true,
        retry: false,
    };

    const { data } = useQuery(['football-league', leagueName], () => fetchFootballLeague(leagueName), queryOptions);

    const divElement = document.createElement('div');

    divElement.innerHTML = data?.data.toString() as string;

    let tableIndex;

    switch (leagueName) {
        case 'La_Liga':
            tableIndex = 3;
            break;
        case 'Premier_League':
            tableIndex = 5;
            break;
        default:
            tableIndex = 0;
    }

    const teamsRowSelector = divElement.querySelectorAll('.wikitable.sortable')?.item(tableIndex)?.querySelectorAll('tr');

    console.log(teamsRowSelector?.item(0)?.innerHTML);
    
    const footballClubs: FootballClubInfo[] = [];

    for (let i = 1; i < teamsRowSelector?.length; i++) {
        const clubSelector = teamsRowSelector?.item(i)?.querySelectorAll('td a');

        footballClubs.push({
            clubName: clubSelector?.item(0)?.textContent as string,
            clubPageUrl: clubSelector?.item(0)?.getAttribute('href') as string,
            clubDetails: null
        });
    }

    return footballClubs;
};

export const useFootballClub = (clubUrl: string, clubInfo: FootballClubInfo[]): FootballClubInfo[] => {

    console.log(clubUrl);

    const queryOptions = {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true,
        retry: false,
    };

    const { data } = useQuery(['football-club', clubUrl], () => fetchFootballClub(clubUrl), queryOptions);

    const divElement = document.createElement('div');

    divElement.innerHTML = data?.data.toString() as string;

    console.log(divElement);

    const clubLogoSelector = divElement.querySelectorAll('td.infobox-image > a > img');
    const infoBoxDataSelector = divElement.querySelectorAll('td.infobox-data');
    const jerseySelector = divElement.querySelectorAll('td.toccolours');

    let capacity: string = '';
    let headCoach: string = '';
    let founded: string = '';
    let president: string = '';
    let ground: string = '';

    for (let i = 0; i < infoBoxDataSelector?.length; i++) {
        const headerSelector = infoBoxDataSelector?.item(i)?.parentNode?.querySelectorAll('th')?.item(0)?.textContent;
        const tdSelector = infoBoxDataSelector?.item(i)?.textContent as string;

        if (headerSelector === 'President') {
            president = tdSelector;
        }

        if (headerSelector === 'Head coach') {
            headCoach = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Ground') {
            ground = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Founded') {
            founded = tdSelector.split('[')[0];
        }

        if (headerSelector === 'Capacity') {
            capacity = tdSelector.split('[')[0];
        }
    }

    if (clubInfo[clubInfo.map(c => c.clubPageUrl).indexOf(clubUrl)]) {
        clubInfo[clubInfo.map(c => c.clubPageUrl).indexOf(clubUrl)].clubDetails = {
            clubLogoUrl: clubLogoSelector?.item(0)?.getAttribute('src') as string,
            clubInfo: {
                capacity,
                headCoach,
                founded,
                ground,
                president,
                jersey: [
                    jerseySelector?.item(0)?.querySelectorAll('td')?.item(0)?.innerHTML,
                    jerseySelector?.item(0)?.querySelectorAll('td')?.item(1)?.innerHTML,
                    jerseySelector?.item(0)?.querySelectorAll('td')?.item(2)?.innerHTML
                ]
            }
        }
    }

    return clubInfo;
};
