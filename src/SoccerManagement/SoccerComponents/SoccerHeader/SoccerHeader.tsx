import React, { useEffect, useState, useContext } from 'react';
import { SoccerContext } from '../../SoccerHomePage';
import { useCountries, useCountryById } from './../../SoccerHooks/useCountries';
import { FootBallTeam } from './FootBallTeam/FootBallTeam';

import './SoccerHeader.css';

export interface SoccerHeaderProps {
}

export const SoccerHeader: React.FunctionComponent<SoccerHeaderProps> = (props) => {

    const soccerContext = useContext(SoccerContext);

    const [currentSelectedIdIndex, setCurrentSelectedIdIndex] = useState(0);

    const countryInfo = useCountryById(soccerContext.countryId);

    const allCountriesIds = useCountries().map(cd => cd.id);

    useEffect(() => {
        soccerContext.setCountryId(allCountriesIds[currentSelectedIdIndex] || 2);
    }, [currentSelectedIdIndex]);

    return (
        <>
            <div className='soccer-home-page-header'>
                <FootBallTeam
                    countryInfo={countryInfo}
                    currentSelectedIdIndex={currentSelectedIdIndex}
                    setCurrentSelectedIdIndex={setCurrentSelectedIdIndex} />
          </div>
        </>
    );
};
