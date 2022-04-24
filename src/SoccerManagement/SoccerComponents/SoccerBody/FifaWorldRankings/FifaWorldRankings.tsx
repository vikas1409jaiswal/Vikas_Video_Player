import { motion, useAnimation } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { SoccerContext } from '../../../SoccerHomePage';
import { FifaTeamDetails, useFifaRankings } from '../../../SoccerHooks/useFifa';

import './FifaWorldRankings.css';

export interface FifaWorldRankingsProps {
}

export const FifaWorldRankings: React.FunctionComponent<FifaWorldRankingsProps> = (props) => {
  const soccerContext = useContext(SoccerContext);

  const [page, setPage] = useState(1);

  const [fifaDetails, successArray] = useFifaRankings(page);

  const [selectedCountryRank, setSelectedCountryRank] = useState(1);

  const fifaRankControl = useAnimation();

  const flag = (successArray as boolean[]).filter(s => s === true).length === successArray.length;

  useEffect(() => {
    if (flag) {
      soccerContext.setFifaRankingDetails([...soccerContext.fifaRankingDetails, ...fifaDetails as FifaTeamDetails[]]);
    }
  }, [flag]);

  useEffect(() => {
    fifaRankControl.start({
      rotateY: [0, 360, 720, 1080, 1440],
      transition: {
        duration: 10
      }
    });
  }, [selectedCountryRank]);

  console.log(soccerContext.fifaRankingDetails);

  const columns = ['Rank', 'Team', 'Average Rank', 'lowest Rank', 'Highest Rank', 'Points', 'Flag'];

  const sortByRank = (a: FifaTeamDetails, b: FifaTeamDetails) => {
    if (a.fifaRank < b.fifaRank) {
      return -1;
    }
    if (a.fifaRank > b.fifaRank) {
      return 1;
    }
    return 0;
  };

  const country = soccerContext.fifaRankingDetails.filter(f => f.fifaRank === selectedCountryRank)[0];

  return (
    <>
      <div className='fifa-ranking-info'>
        {
          page < 11 &&
                <button onClick={() => setPage(page + 1)} disabled={!flag}>{ flag ? 'Load More' : '...Loading'}</button>
        }
        {page < 11 && <h1>{`Page: ${page}`}</h1>}
        {
          page < 11 &&
                    <table className='fifa-world-ranking-table'>
                      <thead>
                        <tr>
                          {columns.map(c => <th>{c}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          soccerContext.fifaRankingDetails.sort(sortByRank).map(k =>
                            <tr>
                              {[k.fifaRank,
                                k.teamName,
                                k.avgRank,
                                k.highestRank,
                                k.lowestRank,
                                k.points
                              ].map(i =>
                                <td>{i}</td>)}
                              <td><img className={'flag-image'} src={k.flagUrl} /></td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
        }
        {
          page > 10 &&
                    <div className='fifa-country-body'>
                      <div className='country-name-header'>
                        <h1>{`${country.teamName } National Football Team`}</h1>
                        <div className='country-team-navigation'>
                          <button
                            onClick={() => {
                              setSelectedCountryRank(selectedCountryRank + 1);
                            }}>{'>>>'}</button>
                          <button
                            onClick={() => {
                              setSelectedCountryRank(selectedCountryRank - 1);
                            }}>{'<<<'}</button>
                        </div>
                      </div>
                      <div className='fifa-country-card'>
                        <div className='fifa-country-image'>
                          <img src={country.flagUrl} />
                          <div className='fifa-points'>
                            <h2>{'Current Ranking'}</h2>
                            <h1>{country.points}</h1>
                          </div>
                        </div>
                        <div className='fifa-country-rank-details'>
                          <div className='fifa-country-rank-card'>
                            <h2>{'Current Rating'}</h2>
                            <h1><motion.div animate={fifaRankControl}>{country.fifaRank}</motion.div></h1>
                          </div>
                          <div className='fifa-country-rank-card'>
                            <h2>{'Average Ranking'}</h2>
                            <h1><motion.div animate={fifaRankControl}>{country.avgRank}</motion.div></h1>
                          </div>
                          <div className='fifa-country-rank-card'>
                            <h2>{'Highest Ranking'}</h2>
                            <h1><motion.div animate={fifaRankControl}>{country.highestRank}</motion.div></h1>
                          </div>
                          <div className='fifa-country-rank-card'>
                            <h2>{'Lowest Ranking'}</h2>
                            <h1><motion.div animate={fifaRankControl}>{country.lowestRank}</motion.div></h1>
                          </div>
                        </div>
                      </div>
                    </div>
        }
      </div>
    </>
  );
};


