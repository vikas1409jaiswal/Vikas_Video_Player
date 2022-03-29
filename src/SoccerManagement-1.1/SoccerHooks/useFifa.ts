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

export interface FifaTeamDetails {
    fifaRank: number,
    teamName: string,
    avgRank: number,
    highestRank: number,
    lowestRank: number,
    flagUrl: string,
    points: string
}


const fetchFifaRankings = (countryCode: string): Promise<AxiosResponse<string>> => {
    return axios.get(`https://www.fifa.com/fifa-world-ranking/${countryCode}`);
}

export const useFifaRankings = (pageNo: number) => {

    const queries: any[] = [];

    const queryOptions = {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true,
        retry: false,
    };

    let countriesList;

    switch (pageNo) {
        case 1:
            countriesList = countries.page1
            break;
        case 2:
            countriesList = countries.page2
            break;
        case 3:
            countriesList = countries.page3
            break;
        case 4:
            countriesList = countries.page4
            break;
        case 5:
            countriesList = countries.page5
            break;
        case 6:
            countriesList = countries.page6
            break;
        case 7:
            countriesList = countries.page7
            break;
        case 8:
            countriesList = countries.page8
            break;
        case 9:
            countriesList = countries.page9
            break;
        case 10:
            countriesList = countries.page10
            break;
        case 11:
            countriesList = countries.page11
            break;
        default:
            countriesList = countries.page1
    }

    Object.keys(countriesList).map(c => queries.push({
        queryKey: ['fifa-ranking', c],
        queryFn: () => fetchFifaRankings(c),
        ...queryOptions
    }))

    const result = useQueries(queries);

    console.log(result);

    const fifaTeamDetails: FifaTeamDetails[] = [];

    const successArray: boolean[] = [];

    result.map((r, i) => {
        const divElement = document.createElement('div');

        divElement.innerHTML = (r.data as ApiResponse)?.data.toString() as string;

        const rankSelectors = divElement.querySelectorAll('.fc-ranking-statistics-section_statisticsContainer__2TdZW')?.item(0)?.querySelectorAll('h1');
        const teamSelectors = divElement.querySelectorAll('main.fc > div.container h1')?.item(0);
        const flagSelectors = divElement.querySelectorAll('main.fc > div.container img')?.item(0);
        const pointSelector = divElement.querySelectorAll('.fc-ranking-item_activeRankingTableRow__g7Sa6 > td:nth-last-child(1) span')?.item(0);

        console.log(pointSelector);

        fifaTeamDetails.push({
            fifaRank: parseInt(rankSelectors?.item(0)?.innerHTML),
            teamName: teamSelectors?.innerHTML,
            avgRank: parseInt(rankSelectors?.item(1)?.innerHTML),
            highestRank: parseInt(rankSelectors?.item(2)?.innerHTML),
            lowestRank: parseInt(rankSelectors?.item(3)?.innerHTML),
            flagUrl: flagSelectors?.getAttribute('src') as string,
            points: pointSelector?.innerHTML
        });

        successArray.push(r.isSuccess);
    })

    console.log(fifaTeamDetails);

    return [fifaTeamDetails, successArray];
}