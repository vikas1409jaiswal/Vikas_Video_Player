import React, { useContext, useState } from 'react';
import { PlayerPosition, SoccerContext } from '../../SoccerHomePage';

import './SoccerFooter.css';

export interface SoccerFooterProps {
}

export const SoccerFooter: React.FunctionComponent<SoccerFooterProps> = (props) => {

  const soccerContext = useContext(SoccerContext);

  const setButtonBackgroundColor = (playerPosition: PlayerPosition) => {
    let bColor = '';
    if (playerPosition === soccerContext.selectedPlayerPosition) {
      bColor = 'red';
    }
    return bColor;
  };

  return (
    <>
      <div className='soccer-home-page-footer'>
        <button
          style={{ backgroundColor: setButtonBackgroundColor(PlayerPosition.forward) }}
          disabled={soccerContext.selectedPlayerPosition === PlayerPosition.forward}
          onClick={() => { soccerContext.setSelectedPlayerPosition(PlayerPosition.forward); }}>
          {'Forward'}
        </button>
        <button
          style={{ backgroundColor: setButtonBackgroundColor(PlayerPosition.midFielder) }}
          disabled={soccerContext.selectedPlayerPosition === PlayerPosition.midFielder}
          onClick={() => { soccerContext.setSelectedPlayerPosition(PlayerPosition.midFielder); }}>
          {'MidFielder'}
        </button>
        <button
          style={{ backgroundColor: setButtonBackgroundColor(PlayerPosition.defender) }}
          disabled={soccerContext.selectedPlayerPosition === PlayerPosition.defender}
          onClick={() => { soccerContext.setSelectedPlayerPosition(PlayerPosition.defender); }}>
          {'Defender'}
        </button>
        <button
          style={{ backgroundColor: setButtonBackgroundColor(PlayerPosition.goalKeeper) }}
          disabled={soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper}
          onClick={() => { soccerContext.setSelectedPlayerPosition(PlayerPosition.goalKeeper); }}>
          {'GoalKeeper'}
        </button>
      </div>
    </>
  );
};
