import { motion, useAnimation } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { Countries } from '../../../SoccerHooks/useCountries';
import { MenuOptions } from './MenuOptions/MenuOptions';

import './FootBallTeam.css';
import { SoccerContext } from '../../../SoccerHomePage';

export interface FootBallTeamProps {
    countryInfo: Countries;
    currentSelectedIdIndex: number;
    setCurrentSelectedIdIndex: (id: number) => void;
}

export const FootBallTeam: React.FunctionComponent<FootBallTeamProps> = (props) => {

    const [isVisibleMenuOptions, setVisibleMenuOptions] = useState(false);

    const teamHeaderControl = useAnimation();

    const soccerContext = useContext(SoccerContext);

    useEffect(() => {
        teamHeaderControl.start({
            scale: [0.1, 1],
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        })
    }, [props.currentSelectedIdIndex])

    if (!isVisibleMenuOptions) {
        soccerContext.setSelectedPlayerUsingDropdown(false);
        soccerContext.setShowAllPlayers(false);
    }

    return (
        <>
            <div className='soccer-football-team-header'>
                {
                    !soccerContext.showFifaRankings && !soccerContext.showAllPlayers &&
                    <>
                        <motion.img animate={teamHeaderControl} src={props.countryInfo ? props.countryInfo.image_path : '//upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/125px-Flag_of_India.svg.png'} />
                        <motion.h1 animate={teamHeaderControl}>{props.countryInfo ? props.countryInfo.name : 'India'} National Football Team</motion.h1>
                        <div className='soccer-football-team-navigation'>
                            <button onClick={() => {
                                props.setCurrentSelectedIdIndex(props.currentSelectedIdIndex + 1);
                            }}>{'>>>'}</button>
                            <button
                                disabled={props.currentSelectedIdIndex === 0}
                                onClick={() => {
                                    props.setCurrentSelectedIdIndex(props.currentSelectedIdIndex - 1);
                                }}>{'<<<'}</button>
                          <button onClick={() => { setVisibleMenuOptions(!isVisibleMenuOptions) }}>{'SC'}</button>
                        </div>
                    </>
                }
                {isVisibleMenuOptions && <MenuOptions />}
            </div>
        </>
    );
};
