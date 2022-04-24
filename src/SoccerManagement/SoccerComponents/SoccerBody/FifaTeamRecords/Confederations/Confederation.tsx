import React, { useContext, useEffect, useState } from 'react';
import { useTeams } from '../../../../SoccerHooks/useTeamRecords';
import { FifaTeam } from './FifaTeam/FifaTeam';

import './Confederations.css';

export interface ConfederationsProps {
  pageUrl: string;
}

export const Confederations: React.FunctionComponent<ConfederationsProps> = (props) => {

  const fifaTeamRecords = useTeams(props.pageUrl);

    const [selectedNation, setSelectedNation] = useState('');
    const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);

  return (
      <>
          <div className='confederation-details'>
              <div className='selection-panel'>
                  <div className='select-soccer-teams'>
                      <select name="teams" value={selectedNation} onChange={(e) => { setSelectedNation(e.target.value); }} disabled={props.pageUrl.length === 0}>
                          <option key={'default'} value={''}> {'...Select Teams'}</option>
                          {fifaTeamRecords.map(f => <option key={f.teamName} value={f.teamName}> {f.teamName}</option>)}
                      </select>
                  </div>
                  <div className='show-advanced-panel-button'>
                      <button onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}>
                          {showAdvancedPanel ? 'Hide Advanced Panel' : 'Show Advanced Panel'}
                      </button>
                  </div>
              </div>
              <FifaTeam
                  nationName={selectedNation}
                  showAdvancedPanel={showAdvancedPanel} />
          </div>
      </>
  );
};