import React, { useState, createContext } from 'react';
import { EntertainmentBody } from './EntertainmentBody/EntertainmentBody';

export interface HomePageProps {
}

export const HomePage: React.FunctionComponent<HomePageProps> = (props) => {

   
    return (
        <>
            <EntertainmentBody/>
        </>
    );
};
