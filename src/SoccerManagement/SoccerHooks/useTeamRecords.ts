import axios, { AxiosResponse } from 'axios';
import { useQueries, useQuery } from 'react-query';
import { countries } from './../SoccerConstants/Constants/Countries';

export interface ApiResponse {
    data: string;
    status: number;
    config: any;
    headers: any;
    request: any;
    statusText: string;
}

export interface FifaTeamRecords {
   teamName: string;
   teamFlagUrl: string;
}


const fetchTeams = (confederation: string): Promise<AxiosResponse<string>> => {
    return axios.get(`https://www.11v11.com/internationals/${confederation}-/}`);
}

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
}
