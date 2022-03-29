import React from 'react';
import { arrangeAlphabetically } from '../../Utilities/ReusableFunctions';
import { performers1 } from './../../DataFiles/Performers/Performers-1';
import { performers2 } from './../../DataFiles/Performers/Performers-2';
import { performers3 } from './../../DataFiles/Performers/Performers-3';
import { performers4 } from './../../DataFiles/Performers/Performers-4';
import { performers5 } from './../../DataFiles/Performers/Performers-5';
import { performers6 } from './../../DataFiles/Performers/Performers-6';
import { performers7 } from './../../DataFiles/Performers/Performers-7';
import { performers8 } from './../../DataFiles/Performers/Performers-8';
import { performers9 } from './../../DataFiles/Performers/Performers-9';
import { performers10 } from './../../DataFiles/Performers/Performers-10';
import { performers11 } from './../../DataFiles/Performers/Performers-11';
import { performers12 } from './../../DataFiles/Performers/Performers-12';
import { performers13 } from './../../DataFiles/Performers/Performers-13';
import { performers14 } from './../../DataFiles/Performers/Performers-14';
import { performers15 } from './../../DataFiles/Performers/Performers-15';
import { performers16 } from './../../DataFiles/Performers/Performers-16';
import { performers17 } from './../../DataFiles/Performers/Performers-17';
import { performers18 } from './../../DataFiles/Performers/Performers-18';
import { performers19 } from './../../DataFiles/Performers/Performers-19';
import { performers20 } from './../../DataFiles/Performers/Performers-20';

export interface PerformersProps {

}

export const Performers: React.FunctionComponent<PerformersProps> = (props) => {

const performers = [...performers11]

    return (
        <>
            <div>
                {
                    //performers.map(p => p.name).sort(arrangeAlphabetically).map(n => <div>{n}</div>)
                    performers.map(p => p.result.map(a =>
                        <tr>
                        <td>{a.name}</td>
                        <td>{a.birthday}</td>
                        <td>{a.birthPlace}</td>
                        {/* <td><img src={p.images.profile[0].lg.url}/></td> */}
                    </tr>
                    ))
                }
            </div>
        </>
    );
};