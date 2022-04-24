import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FootballClubInfo, useFootballClub } from '../../../../../SoccerHooks/useTeamRecords';
import {
  HeadToHead, HeadToHeadMatch, useHeadToHeadMatches, useWikipediaByCountry, useWikipediaByFootballTeam
} from '../../../../../SoccerHooks/useWikipedia';

import './FootballClub.css';

export interface FootballClubProps {
    clubName: string,
    clubPageUrl: string,
    clubLogoUrl: string,
    club: FootballClubInfo,
    teamNationalFlag: string,
    showAdvancedPanel: boolean
}

const defaultHeadToHead: HeadToHead = {
  opponent: '',
  played: '1',
  won: '0',
  drawn: '0',
  lost: '0',
  goalsFor: '0',
  goalsAgainst: '0',
  opponentFlagUrl: ''
};

export const FootballClub: React.FunctionComponent<FootballClubProps> = (props: FootballClubProps) => {

  const columns = ['Opponent', 'Played', 'Won', 'Draw', 'Lost', 'Goal For', 'Goal Against', 'Goal Difference'];

  const [selectedOpponent, setSelectedOpponent] = useState('');
  const [selectedOpponents, setSelectedOpponents] = useState<string[]>([]);
  const [selectedOpponentIndex, setSelectedOpponentIndex] = useState(0);
  const [sortAscendeing, setSortAscending] = useState({
    isSort: false,
    columnName: ''
  });
  const [isAnimation, setAnimation] = useState(false);
  const [startSelection, setStartSelection] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [showSelectedTeamDetails, setShowSelectedTeamDetails] = useState(false);
  const [showKits, setShowKits] = useState(false);

  const teamRecord = useWikipediaByFootballTeam(props.clubName);

  const { teamNationalLogo, teamNationalFlag, teamInformation } = useWikipediaByCountry(props.clubName);

  let headToHeadRecords = teamRecord.headToHeadRecord.filter(h => h.opponent?.length > 0);

  if (selectedOpponent.length > 0) {
    headToHeadRecords = headToHeadRecords.filter(hth => hth.opponent === selectedOpponent);
  }


  const sortBy = (a: HeadToHead, b: HeadToHead) => {
    let x;
    let y;
    switch (sortAscendeing.columnName) {
      case columns[0]:
        x = a.opponent;
        y = b.opponent;
        break;
      case columns[1]:
        x = a.played;
        y = b.played;
        break;
      case columns[2]:
        x = a.won;
        y = b.won;
        break;
      case columns[3]:
        x = a.drawn;
        y = b.drawn;
        break;
      case columns[4]:
        x = a.lost;
        y = b.lost;
        break;
      case columns[5]:
        x = a.goalsFor;
        y = b.goalsFor;
        break;
      case columns[6]:
        x = a.goalsAgainst;
        y = b.goalsAgainst;
        break;
      default:
        x = a.opponent;
        y = b.opponent;
    }

    if (parseInt(x) > parseInt(y)) {
      return -1;
    }
    if (parseInt(x) < parseInt(y)) {
      return 1;
    }
    return 0;
  };

    if (document.getElementsByClassName('jersey-container').item(0) && props.club.clubDetails) {
        if (document.getElementsByClassName('home-jersey').item(0)) {
            (document.getElementsByClassName('home-jersey').item(0) as Element).innerHTML = props.club.clubDetails.clubInfo.jersey[0];
        }
        if (document.getElementsByClassName('away-jersey').item(0)) {
            (document.getElementsByClassName('away-jersey').item(0) as Element).innerHTML = props.club.clubDetails.clubInfo.jersey[1];
        }
        if (document.getElementsByClassName('third-jersey').item(0)) {
            (document.getElementsByClassName('third-jersey').item(0) as Element).innerHTML = props.club.clubDetails.clubInfo.jersey[2];
        }
    }

    const clubLogoControl = useAnimation();
    const jerseyControl = useAnimation();

    useEffect(() => {
        clubLogoControl.start({
            scale: [0.1, 1],
            rotate: [720, 0],
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        });
        jerseyControl.start({
            scale: [0.1, 1],
            transition: {
                duration: 3
            }
        });
    }, [props.clubName]);

  return (
      <>
          {
              props.clubName &&
              <div className='fifa-team-details'>
                  {
                      selectedOpponent.length === 0 && selectedOpponents.length === 0 ?
                          <div>
                              <img src={props.clubLogoUrl?.toString()} />
                              <h2 style={{ fontSize: '60px' }}>{props.clubName}</h2>
                              <img src={props.clubLogoUrl?.toString()} />
                          </div> :
                          <div>
                              <img src={props.clubLogoUrl?.toString()} />
                              <HeadToHeadHeader
                                  nationName={props.clubName}
                                  opponentNationName={selectedOpponent.length === 0 ? selectedOpponents[selectedOpponentIndex] : selectedOpponent} />
                          </div>
                  }
              </div>
          }
          {
              !isAnimation && props.showAdvancedPanel && <div className='select-opponent-team'>
                  <button onClick={() => {
                      setShowSelectedTeamDetails(!showSelectedTeamDetails);
                  }}
                      disabled={props.clubName?.length === 0}>
                      {showSelectedTeamDetails ? `Hide Details` : `Show Details`}
                  </button>
                  <button onClick={() => {
                      setShowKits(!showKits);
                  }}
                      disabled={props.clubName?.length === 0}>
                      {showKits ? `Hide Kits` : `Show Kits`}
                  </button>
                  <button onClick={() => {
                      setAnimation(!isAnimation);
                  }}
                      disabled={props.clubName?.length === 0 || selectedOpponent.length === 0}>
                      {isAnimation ? 'Stop Animation' : 'Start Animation'}
                  </button>
                  <select name="teams" value={selectedOpponent} onChange={(e) => { setSelectedOpponent(e.target.value); }} disabled={props.clubName?.length === 0}>
                      <option value={''}>{'... Select Opponent'}</option>
                      {teamRecord.headToHeadRecord.map(f => f.played && <option key={f.opponent} value={f.opponent}> {f.opponent}</option>)}
                  </select>
                  <button onClick={() => {
                      setStartSelection(!startSelection);
                  }}
                      disabled={props.clubName?.length === 0}>
                      {startSelection ? 'Stop Selection' : 'Start Selection'}
                  </button>
                  {
                      showSelection ?
                          <button onClick={() => {
                              setSelectedOpponentIndex(selectedOpponentIndex + 1);
                          }}
                              disabled={selectedOpponentIndex + 1 === selectedOpponents.length} >
                              {'Next Selection'}
                          </button> :
                          <button onClick={() => {
                              setShowSelection(true);
                          }}
                              disabled={selectedOpponents.length === 0}>
                              {'Apply Selection'}
                          </button>
                  }
              </div>
          }
          {
              selectedOpponent.length === 0 ?
                  (!showSelection && !showSelectedTeamDetails && <table className='head-to-head-info'>
                      <thead>
                          <tr style={{ gridTemplateColumns: startSelection ? '1fr 6fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr' : '3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                              {startSelection &&
                                  <th>
                                      <input
                                          type='checkbox'
                                          className='select-all-checkbox'
                                          onChange={(e) =>
                                              e.target.checked ?
                                                  setSelectedOpponents(headToHeadRecords.map(h => h.opponent)) :
                                                  setSelectedOpponents([])} />
                                  </th>}
                              {columns.map(c => <th onClick={() => setSortAscending({
                                  isSort: !sortAscendeing.isSort,
                                  columnName: c
                              })}>{c}</th>)}
                          </tr>
                      </thead>
                      <tbody>
                          {
                              (sortAscendeing.isSort ? headToHeadRecords.sort(sortBy) : headToHeadRecords).map(k =>
                                  <tr style={{ gridTemplateColumns: startSelection ? '1fr 6fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr' : '3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                                      {
                                          startSelection &&
                                          <th>
                                              <input
                                                  type='checkbox'
                                                  className='select-checkbox'
                                                  checked={selectedOpponents.length === headToHeadRecords.length ? true : selectedOpponents.indexOf(k.opponent) !== -1}
                                                  onChange={(e) =>
                                                      e.target.checked ?
                                                          setSelectedOpponents([...selectedOpponents, k.opponent]) :
                                                          setSelectedOpponents(selectedOpponents.filter(o => o !== k.opponent))} />
                                          </th>
                                      }
                                      {[
                                          k.opponent,
                                          k.played,
                                          k.won,
                                          k.drawn,
                                          k.lost,
                                          k.goalsFor,
                                          k.goalsAgainst
                                      ].map((i, p) =>
                                          <td className={`cell-${p + 1}`}>{i}</td>)
                                      }
                                      <td> {(parseInt(k.goalsFor) - parseInt(k.goalsAgainst)) > 0 ?
                                          `+${(parseInt(k.goalsFor) - parseInt(k.goalsAgainst))}` :
                                          (parseInt(k.goalsFor) - parseInt(k.goalsAgainst))}</td>
                                  </tr>
                              )
                          }
                          {
                              selectedOpponent.length === 0 &&
                              <tr>
                                  <td><b>{'Total'}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.played) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.won) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.drawn) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.lost) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.goalsFor) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{headToHeadRecords.map(h => h.played ? parseInt(h.goalsAgainst) : 0).reduce((a, b) => a + b, 0)}</b></td>
                                  <td><b>{
                                      headToHeadRecords.map(h => h.played ? parseInt(h.goalsFor) : 0).reduce((a, b) => a + b, 0) -
                                      headToHeadRecords.map(h => h.played ? parseInt(h.goalsAgainst) : 0).reduce((a, b) => a + b, 0)
                                  }</b></td>
                              </tr>
                          }
                      </tbody>
                  </table>) :
                  <div className='head-to-head-single-result'>
                      <HeadToHeadHeadSingleResult
                          isAnimation={isAnimation}
                          setAnimation={setAnimation}
                          nationName={props.clubName}
                          opponentNationName={selectedOpponent}
                          teamNationalFlag={teamNationalFlag}
                          headToHeadRecords={headToHeadRecords} />
                  </div>
          }
          {
              showSelection && <div className='head-to-head-single-result'>
                  <HeadToHeadHeadSelectedResult
                      nationName={props.clubName}
                      opponentNationName={selectedOpponents[selectedOpponentIndex]}
                      selectedHeadToHeadRecord={headToHeadRecords.filter(r => selectedOpponents.indexOf(r.opponent) !== -1)[selectedOpponentIndex]}
                      teamNationalFlag={teamNationalFlag} />
              </div>
          }
          {
              showSelectedTeamDetails && <div className='selected-team-details'>
                  <div className='team-details-container-column-1'>
                      <img src={props.teamNationalFlag} />
                      <motion.img src={props.clubLogoUrl} animate={clubLogoControl} />
                  </div>
                  <div className='team-details-container-column-2'>
                      {
                          !showKits && <>
                              <div><span>Founded </span><span>{props.club.clubDetails?.clubInfo.founded as string}</span></div>
                              <div><span>Head Coach </span><span>{props.club.clubDetails?.clubInfo.headCoach as string}</span></div>
                              <div><span>President </span><span>{props.club.clubDetails?.clubInfo.president as string}</span></div>
                              <div><span>Ground </span><span>{props.club.clubDetails?.clubInfo.ground as string}</span></div>
                              <div><span>Capacity </span><span>{props.club.clubDetails?.clubInfo.capacity as string}</span></div>
                          </>
                      }
                      {
                          showKits && props.club.clubDetails &&
                          < div className='jersey-container'
                              style={props.club.clubDetails.clubInfo.jersey[2] ? { gridTemplateColumns: '1fr 1fr 1fr' } : { gridTemplateColumns: '1fr 1fr' }}>
                              {props.club.clubDetails.clubInfo.jersey[0] && <motion.div className='home-jersey' style={props.club.clubDetails.clubInfo.jersey[2] ? { zoom: '280%' } : { zoom: '320%' }} animate={jerseyControl}>{'...Loading'}</motion.div>}
                              {props.club.clubDetails.clubInfo.jersey[1] && <motion.div className='away-jersey' style={props.club.clubDetails.clubInfo.jersey[2] ? { zoom: '280%' } : { zoom: '320%' }} animate={jerseyControl}>{'...Loading'}</motion.div>}
                              {props.club.clubDetails.clubInfo.jersey[2] && <motion.div className='third-jersey' animate={jerseyControl}>{'...Loading'}</motion.div>}
                          </div>
                      }
                  </div>
              </div>
          }
      </>
  );
};

type HeadToHeadHeaderProps = {
  nationName: string;
  opponentNationName: string;
};

export const HeadToHeadHeader: React.FunctionComponent<HeadToHeadHeaderProps> = (props) => {

  const { teamNationalLogo } = useWikipediaByCountry(props.opponentNationName);

  return (
    <>
      <h2 className='head-to-head-header'>
        <p>{props.nationName}</p>
        {' vs '}
        <p>{props.opponentNationName}</p></h2>
      <img src={teamNationalLogo?.toString()} />
    </>
  );
};

type HeadToHeadSingleResultProps = {
  isAnimation: boolean;
  nationName: string;
  opponentNationName: string;
  setAnimation: (isAnimation: boolean) => void;
  teamNationalFlag: string;
  headToHeadRecords: HeadToHead[];
};

export const HeadToHeadHeadSingleResult: React.FunctionComponent<HeadToHeadSingleResultProps> = (props: HeadToHeadSingleResultProps) => {

  const {
    isAnimation, setAnimation, nationName, teamNationalFlag, headToHeadRecords, opponentNationName
  } = props;

  const [animationStateValues, setAnimationStateValues] = useState<HeadToHead>(defaultHeadToHead);
  const [matchIndex, setMatchIndex] = useState(0);

  const headToHeadMatches = useHeadToHeadMatches(nationName, opponentNationName);

  const match = headToHeadMatches[matchIndex];

  const separatorTeams = headToHeadMatches[matchIndex]?.match.split(' v ')[0];
  const separatorTeams2 = headToHeadMatches[matchIndex]?.match.split(' v ')[1];
  const separatorGoals = headToHeadMatches[matchIndex]?.score.split('-')[0];
  const separatorGoals2 = headToHeadMatches[matchIndex]?.score.split('-')[1];

  useEffect(() => {
    (isAnimation && matchIndex === 0) ? setAnimationStateValues({
      played: '1',
      won: headToHeadMatches[0]?.result === 'W' ? '1' : '0',
      drawn: headToHeadMatches[0]?.result === 'D' ? '1' : '0',
      lost: headToHeadMatches[0]?.result === 'L' ? '1' : '0',
      goalsFor: separatorTeams === nationName ? separatorGoals : separatorGoals2,
      goalsAgainst: separatorTeams === nationName ? separatorGoals2 : separatorGoals,
      opponent: '',
      opponentFlagUrl: ''
    }) : setAnimationStateValues(animationStateValues);
  });

  useEffect(() => {
    (isAnimation && matchIndex < headToHeadMatches.length && matchIndex > 0) ? setAnimationStateValues({
      played: `${matchIndex + 1}`,
      won: match.result === 'W' ? `${parseInt(animationStateValues.won) + 1}` : animationStateValues.won,
      drawn: match.result === 'D' ? `${parseInt(animationStateValues.drawn) + 1}` : animationStateValues.drawn,
      lost: match.result === 'L' ? `${parseInt(animationStateValues.lost) + 1}` : animationStateValues.lost,
      goalsFor: `${parseInt(animationStateValues.goalsFor) + parseInt(separatorTeams === nationName ? separatorGoals : separatorGoals2)}`,
      goalsAgainst: `${parseInt(animationStateValues.goalsAgainst) + parseInt(separatorTeams === nationName ? separatorGoals2 : separatorGoals)}`,
      opponent: '',
      opponentFlagUrl: ''
    }) : setAnimationStateValues(animationStateValues);
  }, [matchIndex]);

  setTimeout(() => {
    (isAnimation && matchIndex < headToHeadMatches.length) ? setMatchIndex(matchIndex + 1) : setMatchIndex(matchIndex);
  }, 2000);


  return (
    <>
      <div className='common-head-to-head'>
        <img className='country-flag-card' src={teamNationalFlag} />
        <div className='head-to-head-results-data'>
          <h2>{`${nationName} Won`}</h2>
          <h1>{isAnimation ? animationStateValues.won : headToHeadRecords[0]?.won}</h1>
        </div>
        <div className='head-to-head-results-data'>
          <h2>{'Goals'}</h2>
          <h1>{isAnimation ? animationStateValues.goalsFor : headToHeadRecords[0]?.goalsFor}</h1>
        </div>
      </div>
      <div className='common-head-to-head total-count'>
        <div>
          <h2>{'Played'}</h2>
          <h1>{isAnimation ? animationStateValues.played : headToHeadRecords[0]?.played}</h1>
        </div>
        <div className='winner-name'>
          {
            isAnimation ?
              (parseInt(animationStateValues.won) > parseInt(animationStateValues.lost) ? nationName.toUpperCase() : opponentNationName.toUpperCase()) :
              (parseInt(headToHeadRecords[0]?.won) > parseInt(headToHeadRecords[0]?.lost) ? nationName.toUpperCase() : opponentNationName.toUpperCase())
          }
        </div>
        <div>
          <h2>{'Drawn'}</h2>
          <h1>{isAnimation ? animationStateValues.drawn : headToHeadRecords[0]?.drawn}</h1>
        </div>
        <div className='head-to-head-matches' style={{
          height: '330px',
          overflowY: 'scroll'
        }}>
          <HeadToHeadHeaderMatches
            isAnimation={isAnimation}
            matchIndex={matchIndex}
            headToHeadMatches={headToHeadMatches}
            setAnimation={setAnimation} />
        </div>
      </div>
      <div className='common-head-to-head'>
        <OpponentsDetails opponentNationName={opponentNationName} />
        <div className='head-to-head-results-data'>
          <h2>{`${opponentNationName} Won`}</h2>
          <h1>{isAnimation ? animationStateValues.lost : headToHeadRecords[0]?.lost}</h1>
        </div>
        <div className='head-to-head-results-data'>
          <h2>{'Goals'}</h2>
          <h1>{isAnimation ? animationStateValues.goalsAgainst : headToHeadRecords[0]?.goalsAgainst}</h1>
        </div>
      </div>
    </>
  );
};

type HeadToHeadMatchesProps = {
  isAnimation: boolean;
  matchIndex: number;
  headToHeadMatches: HeadToHeadMatch[];
  setAnimation: (isAnimation: boolean) => void;
};

export const HeadToHeadHeaderMatches: React.FunctionComponent<HeadToHeadMatchesProps> = (props: HeadToHeadMatchesProps) => {

  const {
    headToHeadMatches, isAnimation, matchIndex, setAnimation
  } = props;

  return (
    <>
      {
        !isAnimation ?
          <table className='head-to-head-matches-table'>
            <thead>
              <tr>
                {
                  ['Date', 'Winner vs Loser', 'Result', 'Competition'].map(h => <th>{h}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                headToHeadMatches.map((h, i) => <tr key={`match-no-${i + 1}`}>
                  {
                    [
                      h.date,
                      h.match,
                      h.score,
                      h.competition
                    ].map(d => <td>{d}</td>)
                  }
                </tr>)
              }
            </tbody>
          </table> :
          ( (matchIndex < headToHeadMatches.length) ? <div className='head-to-head-matches-animation' style={{
            height: '300px',
            backgroundColor: 'yellow'
          }}>
            <div>
              <h1>{`Match No-${matchIndex + 1}`}</h1>
              <h3>{headToHeadMatches[matchIndex]?.date}</h3>
              <h3>{headToHeadMatches[matchIndex]?.competition}</h3>
              <div className='goal-match-card'>
                <div>
                  <span>{headToHeadMatches[matchIndex]?.match.split(' v ')[0]}</span>
                  <span>{headToHeadMatches[matchIndex]?.score.split('-')[0]}</span>
                </div>
                <div>
                  <span>{headToHeadMatches[matchIndex]?.match.split(' v ')[1]}</span>
                  <span>{headToHeadMatches[matchIndex]?.score.split('-')[1]}</span>
                </div>
              </div>
            </div>
          </div> :
            <div className='head-to-head-matches-animation' style={{
              height: '300px',
              backgroundColor: 'yellow'
            }}>
              <h1>{'The End'}</h1>
              <button onClick={() => setAnimation(false)}>{'Go Back'}</button>
            </div>)
      }
    </>
  );
};

type OpponentDetailsProps = {
  opponentNationName: string;
  animateFlag?: any;
};

export const OpponentsDetails: React.FunctionComponent<OpponentDetailsProps> = (props) => {

  const { teamNationalFlag } = useWikipediaByCountry(props.opponentNationName);

  return (
    <>
      <motion.img className='country-flag-card' src={teamNationalFlag} animate={props.animateFlag} />
    </>
  );
};

type HeadToHeadSelectedResultProps = {
  nationName: string;
  opponentNationName: string;
  selectedHeadToHeadRecord: HeadToHead;
  teamNationalFlag: string;
};

export const HeadToHeadHeadSelectedResult: React.FunctionComponent<HeadToHeadSelectedResultProps> = (props: HeadToHeadSelectedResultProps) => {

  const {
    nationName, opponentNationName, selectedHeadToHeadRecord, teamNationalFlag
  } = props;

  const headToHeadMatches = useHeadToHeadMatches(nationName, opponentNationName);

  const flagControl = useAnimation();
  const headToHeadControl = useAnimation();

  useEffect(() => {
    headToHeadControl.start({
      rotateY: [0, 360, 720],
      transition: {
        duration: 5
      }
    });
    flagControl.start({
      scale: [0.1, 1.0],
      transition: {
        duration: 2
      }
    });
  }, [opponentNationName]);

  const calcBiggestWin = () => {
    const winMatches = headToHeadMatches.filter(h => h.result === 'W');
    const allScores = winMatches.map(w => w.score.split('-').map(s => parseInt(s)));
    const biggestNumbers = allScores.map(s => ((s[0] > s[1]) ? (s[0] - s[1]) : (s[1] - s[0])));
    const num = Math.max(...biggestNumbers);
    return winMatches[biggestNumbers?.indexOf(num)]?.score;
  };

  return (
    <>
      <div className='common-head-to-head'>
        <motion.img className='country-flag-card' src={teamNationalFlag} animate={flagControl} />
        <div className='head-to-head-results-data'>
          <h2>{`${nationName} Won`}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.won}</motion.h1>
        </div>
        <div className='head-to-head-results-data'>
          <h2>{'Goals'}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.goalsFor}</motion.h1>
        </div>
      </div>
      <div className='common-head-to-head total-count'>
        <div>
          <h2>{'Played'}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.played}</motion.h1>
        </div>
        <div className='winner-name'>
          {
            parseInt(selectedHeadToHeadRecord?.won) > parseInt(selectedHeadToHeadRecord?.lost) ? nationName.toUpperCase() : opponentNationName.toUpperCase()
          }
        </div>
        <div>
          <h2>{'Drawn'}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.drawn}</motion.h1>
        </div>
        <div className='extra-records' style={{
          height: '330px',
          overflowY: 'scroll'
        }}>
          <div>
            <h2>{'First International Match'}</h2>
            <h1>{headToHeadMatches[0]?.date}</h1>
          </div>
          <div>
            <h2>{'Biggest Win'}</h2>
            <h1>{calcBiggestWin()}</h1>
          </div>
        </div>
      </div>
      <div className='common-head-to-head'>
        <OpponentsDetails opponentNationName={opponentNationName} animateFlag={flagControl} />
        <div className='head-to-head-results-data'>
          <h2>{`${opponentNationName} Won`}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.lost}</motion.h1>
        </div>
        <div className='head-to-head-results-data'>
          <h2>{'Goals'}</h2>
          <motion.h1 animate={headToHeadControl}>{selectedHeadToHeadRecord.goalsAgainst}</motion.h1>
        </div>
      </div>
    </>
  );
};