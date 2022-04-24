import React, { useContext } from 'react';
import { SoccerContext } from '../../../SoccerHomePage';
import { useCountries } from '../../../SoccerHooks/useCountries';
import { useWikipediaByCountry } from '../../../SoccerHooks/useWikipedia';

export interface AllPlayersInfoProps {

}

export const AllPlayersInfo: React.FunctionComponent<AllPlayersInfoProps> = (props) => {
    const soccerContext = useContext(SoccerContext);

    const columns = ['Full Name', 'Date Of Birth', 'International Matches', 'International Goals', 'Football Club']

    const soccerPlayers = useWikipediaByCountry(useCountries().filter(c => c.id === soccerContext.countryId)[0]?.name);

    return (
        <>
            <div className='all-players-info'>
                <table className='players-info-table'>
                    <thead>
                        <tr>
                            {columns.map(c => <th>{c}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <div className='current-squad-header'>{'Current Squad'}</div>
                        {
                            soccerPlayers.currentSquad.map(k =>
                                <tr>
                                    {[k.playerName,
                                    k.dateOfBirth,
                                    k.InternationlCarreer.matches,
                                    k.InternationlCarreer.goals].map(i => 
                                        <td>{i}</td>)}
                                    <td>{k.clubName}  <img src={k.clubNationFlag?.toString()} /></td>
                                </tr>

                            )

                        }
                        <div>{'Recent Call Ups'}</div>
                        {
                            soccerPlayers.recentCallUps.map(k =>
                                <tr>
                                    {[k.playerName,
                                    k.dateOfBirth,
                                    k.InternationlCarreer.matches,
                                    k.InternationlCarreer.goals].map(i => <td>{i}</td>)}
                                    <td>{k.clubName}  <img src={k.clubNationFlag?.toString()} /></td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

