import React, { useState, createContext } from 'react';
import { EntertainmentBody } from './EntertainmentBody/EntertainmentBody';
import { Performers } from './EntertainmentBody/Performers/Performers';

export interface HomePageProps {
}

export const HomePage: React.FunctionComponent<HomePageProps> = (props) => {

   
    return (
        <>
            {/* <Performers /> */}
             <EntertainmentBody /> 
        </>
    );
};
