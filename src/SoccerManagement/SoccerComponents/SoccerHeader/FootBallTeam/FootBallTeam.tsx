import React from 'react';
import { Countries } from '../../../SoccerHooks/useCountries';

import './FootBallTeam.css';

export interface FootBallTeamProps {
    countryInfo: Countries;
    currentSelectedIdIndex: number;
    setCurrentSelectedIdIndex: (id: number) => void;
}

export const FootBallTeam: React.FunctionComponent<FootBallTeamProps> = (props) => {
    return (
        <>
            <div className='soccer-football-team-header'>
                <img src={props.countryInfo ? props.countryInfo.image_path : '//upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/125px-Flag_of_India.svg.png'} />
                <h1>{props.countryInfo ? props.countryInfo.name : 'India'} National Football Team</h1>
                <div className='soccer-football-team-navigation'>
                    <button onClick={() => {
                        props.setCurrentSelectedIdIndex(props.currentSelectedIdIndex + 1);
                    }}>{'>>>'}</button>
                    <button
                        disabled={props.currentSelectedIdIndex === 0}
                        onClick={() => {
                        props.setCurrentSelectedIdIndex(props.currentSelectedIdIndex - 1);
                    }}>{'<<<'}</button>
                </div>
            </div>
        </>
    );
};
