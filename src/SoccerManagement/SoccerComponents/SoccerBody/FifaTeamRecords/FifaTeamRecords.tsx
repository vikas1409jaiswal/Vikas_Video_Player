import React, {  useEffect, useState } from 'react';
import { Confederations } from './Confederations/Confederation';
import { FootballLeague } from './FootballLeague/FootballLeague';

import './FifaTeamRecords.css';
import { useFootballLeague } from '../../../SoccerHooks/useTeamRecords';

export interface FifaTeamRecordsProps {

}

type Confederation = {
    name: string;
    pageUrl: string;
};

type FootBallLeague = {
    leagueName: string,
    pageUrl: string
}

type DomesticNation = {
    name: string;
    flagUrl: string;
    pageUrl: string;
    leagues: FootBallLeague[];
};


export const FifaTeamRecords: React.FunctionComponent<FifaTeamRecordsProps> = (props) => {

    const confederations: Confederation[] = [
        {
            name: 'African nations(CAF)',
            pageUrl: 'confederation-of-african-football-caf',
        },
        {
            name: 'Asian nations(AFC)',
            pageUrl: 'asian-football-confederation-afc'
        },
        {
            name: 'European nations (UEFA)',
            pageUrl: 'union-of-european-football-associations-uefa'
        },
        {
            name: 'North and Central America nations (CONCACAF)',
            pageUrl: 'confederation-of-north-central-american-and-caribbean-association-football-concacaf'
        },
        {
            name: 'South American nations (CONMEBOL)',
            pageUrl: 'south-american-football-confederation-conmebol'
        },
        {
            name: 'Oceania nations (OFC)',
            pageUrl: 'oceania-football-confederation-ofc'
        }
    ];

    const NationList: DomesticNation[] = [
        {
            name: 'Spain',
            flagUrl: '//upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/125px-Bandera_de_Espa%C3%B1a.svg.png',
            pageUrl: '',
            leagues: [{
                leagueName: 'LaLiga',
                pageUrl: 'La_Liga'
            },
            {
                leagueName: 'LaLiga2',
                pageUrl: 'Segunda División'
            }]
        },
        {
            name: 'Italy',
            flagUrl: '//upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/125px-Flag_of_Italy.svg.png',
            pageUrl: '',
            leagues: [{
                leagueName: 'Serie A',
                pageUrl: 'Serie_A'
            },
            {
                leagueName: 'Serie B',
                pageUrl: ''
            }]
        },
        {
            name: 'France',
            flagUrl: '//upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/125px-Flag_of_France.svg.png',
            pageUrl: '',
            leagues: [{
                leagueName: 'Ligue 1',
                pageUrl: 'Ligue_1'
            },
            {
                leagueName: 'Ligue 2',
                pageUrl: ''
            }]
        },
        {
            name: 'Germany',
            flagUrl: '//upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png',
            pageUrl: '',
            leagues: [{
                leagueName: 'Bundesliga',
                pageUrl: 'Bundesliga'
            },
            {
                leagueName: '2. Bundesliga',
                pageUrl: ''
            }]
        },
        {
            name: 'England',
            flagUrl: '//upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png',
            pageUrl: '',
            leagues: [{
                leagueName: 'Premier League',
                pageUrl: 'Premier_League'
            },
            {
                leagueName: 'League Two',
                pageUrl: ''
            }]
        }
    ];

    const [selectedType, setSelectedType] = useState('Domestic');

    const [selectedConfederation, setSelectedConfederation] = useState<Confederation>({
        name: 'European nations (UEFA)',
        pageUrl: 'union-of-european-football-associations-uefa'
    });

    const [selectedDomesticNation, setSelectedDomesticNation] = useState<DomesticNation>(NationList[4]);

    const [selectedLeague, setSelectedLeague] = useState(selectedDomesticNation.leagues[0].leagueName);

    const clubs = useFootballLeague(selectedDomesticNation.leagues.filter(l => l.leagueName === selectedLeague)[0]?.pageUrl);

    useEffect(() => {
        setSelectedLeague(selectedDomesticNation.leagues[0].leagueName)
    }, [selectedDomesticNation.name])

    return (
        <>
            <div className='fifa-team-records-container'>
                <div className='select-soccer-type'>
                    {
                        ['International', 'Domestic'].map(x =>
                            <span onClick={() => setSelectedType(x)}
                                style={{
                                    color: (selectedType === x) ? 'yellow' : 'white',
                                    backgroundColor: (selectedType === x) ? 'purple' : 'blue'
                                }}>
                                {x}
                            </span>)
                    }
                </div>
                <div className='select-soccer-conf'>
                    {
                        selectedType === 'International' && confederations.map(x =>
                            <span onClick={() => setSelectedConfederation(confederations.filter(c => c.name.indexOf(x.name) != -1)[0])}
                                style={{
                                    color: (selectedConfederation.name === x.name) ? 'yellow' : 'white',
                                    backgroundColor: (selectedConfederation.name === x.name) ? 'purple' : 'blue'
                                }}>
                                {x.name.slice(x.name.indexOf('(') + 1, x.name.lastIndexOf(')'))}
                            </span>)
                    }
                    {
                        selectedType === 'Domestic' && NationList.map(x =>
                            <span onClick={() => setSelectedDomesticNation(x)}
                                style={{
                                    color: (selectedDomesticNation.name === x.name) ? 'yellow' : 'white',
                                    backgroundColor: (selectedDomesticNation.name === x.name) ? 'purple' : 'blue'
                                }}>
                                {x.name}
                            </span>)
                    }
                </div>
                <div className='select-soccer-league'>
                    {
                        selectedType === 'Domestic' && selectedDomesticNation.leagues.map(x =>
                            <span onClick={() => setSelectedLeague(x.leagueName)}
                                style={{
                                    color: (selectedLeague === x.leagueName) ? 'yellow' : 'white',
                                    backgroundColor: (selectedLeague === x.leagueName) ? 'purple' : 'blue'
                                }}>
                                {x.leagueName}
                            </span>)
                    }
                </div>
                {
                    selectedType === 'International' &&
                    <div className='fifa-teams-record-details'>
                        <h2 >{selectedConfederation.name}</h2>
                        <div className='countries-card'>
                            <Confederations pageUrl={selectedConfederation.pageUrl} />
                        </div>
                    </div>
                }
                {
                    selectedType === 'Domestic' &&
                    <div className='club-teams-record-details'>
                        <h2 >{`${selectedLeague} (${selectedDomesticNation.name})`}</h2>
                        <div className='clubs-card'>
                            <FootballLeague clubs={clubs} teamNationalFlag={selectedDomesticNation.flagUrl} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};
