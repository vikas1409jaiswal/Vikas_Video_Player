import { motion, useAnimation } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { useTeams } from './../../../SoccerHooks/useTeamRecords';
import { Confederations } from './Confederations/Confederation';

import './FifaTeamRecords.css';
import { SoccerContext } from '../../../SoccerHomePage';
import { useWikipediaByFootballTeam } from '../../../SoccerHooks/useWikipedia';

export interface FifaTeamRecordsProps {
  
}

type Confederation = {
    name: string,
    pageUrl: string
}

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
    ]

    const [selectedConfederation, setSelectedConfederation] = useState<Confederation>({ name: 'European nations (UEFA)', pageUrl: 'union-of-european-football-associations-uefa' });

    return (
        <>
            <div className='fifa-team-records-container'>
                <div className='select-soccer-conf'>
                    {
                        confederations.map(x =>
                            <span onClick={() => setSelectedConfederation(confederations.filter(c => c.name.indexOf(x.name) != -1)[0])}
                                style={{
                                    color: (selectedConfederation.name === x.name) ? 'yellow' : 'white',
                                    backgroundColor: (selectedConfederation.name === x.name) ? 'purple' : 'blue'
                                }}>
                                {x.name.slice(x.name.indexOf('(') + 1, x.name.lastIndexOf(')'))}
                            </span>)
                    }
                </div>
                <div className='fifa-teams-record-details'>
                    <h2 >{selectedConfederation.name}</h2>
                    <div className='countries-card'>
                        <Confederations pageUrl={selectedConfederation.pageUrl} />
                    </div>
                </div>
            </div>
        </>
    );
};
