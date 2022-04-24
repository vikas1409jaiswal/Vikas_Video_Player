import React, { useEffect, useState } from 'react';
import { FootballClubInfo, useFootballClub, useFootballLeague } from '../../../../SoccerHooks/useTeamRecords';
import { FootballClub } from './FootballClub/FootballClub';

import './FootballLeague.css';

export interface FootballLeagueProps {
    clubs: FootballClubInfo[];
    teamNationalFlag: string;
}

export const FootballLeague: React.FunctionComponent<FootballLeagueProps> = (props) => {

    const [selectedClub, setSelectedClub] = useState<FootballClubInfo>(props.clubs[0]);
    const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);

  return (
      <>
          <div className='club-details'>
              <div className='select-soccer-teams'>
                  <select name="teams" value={selectedClub?.clubName} onChange={(e) => { setSelectedClub({ ...selectedClub, clubName: e.target.value }); }} disabled={props.clubs.length === 0}>
                      <option key={'default'} value={''}> {'...Select Teams'}</option>
                      {props.clubs.map(c => <option key={c.clubName} value={c.clubName}> {c.clubName}</option>)}
                  </select>
              </div>
              <div className='show-advanced-panel-button'>
                  <button onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}>
                      {showAdvancedPanel ? 'Hide Advanced Panel' : 'Show Advanced Panel'}
                  </button>
              </div>
          </div>
          <FootballClubWrapper
              selectedClubName={selectedClub?.clubName}
              selectedClub={selectedClub}
              clubs={props.clubs}
              setSelectedClub={setSelectedClub}
              clubLogoUrl={selectedClub?.clubDetails?.clubLogoUrl as string}
              teamNationalFlag={props.teamNationalFlag}
              showAdvancedPanel={showAdvancedPanel} />
    </>
  );
};

export type FootballClubWrapperProps = {
    selectedClubName: string;
    selectedClub: FootballClubInfo;
    clubs: FootballClubInfo[];
    setSelectedClub: React.Dispatch<React.SetStateAction<FootballClubInfo>>;
    clubLogoUrl: string;
    teamNationalFlag: string;
    showAdvancedPanel: boolean;
}

export const FootballClubWrapper: React.FunctionComponent<FootballClubWrapperProps> = ({
    selectedClubName,
    selectedClub,
    clubs,
    setSelectedClub,
    clubLogoUrl,
    teamNationalFlag,
    showAdvancedPanel
}) => {

    const clubRecord = useFootballClub(selectedClub?.clubPageUrl, clubs);

    const selectedClubInfo = clubRecord.filter(c => c.clubName === selectedClubName)[0];

    useEffect(() => {
        setSelectedClub({
            clubName: selectedClubName,
            clubPageUrl: selectedClubInfo?.clubPageUrl as string,
            clubDetails: {
                clubLogoUrl: selectedClubInfo?.clubDetails?.clubLogoUrl as string,
                clubInfo: {
                    headCoach: selectedClubInfo?.clubDetails?.clubInfo?.headCoach as string,
                    founded: selectedClubInfo?.clubDetails?.clubInfo?.founded as string,
                    capacity: selectedClubInfo?.clubDetails?.clubInfo?.capacity as string,
                    president: selectedClubInfo?.clubDetails?.clubInfo?.president as string,
                    ground: selectedClubInfo?.clubDetails?.clubInfo?.ground as string,
                    jersey: selectedClubInfo?.clubDetails?.clubInfo?.jersey as string[]
                }
            }
        })
    }, [selectedClubInfo?.clubDetails?.clubLogoUrl])

    return (
        <>
            <FootballClub
                clubName={selectedClubName}
                clubPageUrl={selectedClubInfo?.clubPageUrl}
                clubLogoUrl={clubLogoUrl}
                club={selectedClubInfo}
                teamNationalFlag={teamNationalFlag}
                showAdvancedPanel={showAdvancedPanel} />
        </>
    );
};