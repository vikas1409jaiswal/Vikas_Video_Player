import React, { useState, createContext } from 'react';

export interface ThumbnailProps {
}

export const Thumbnail: React.FunctionComponent<ThumbnailProps> = (props) => {
    return (
        <>
         <div className='thumbnail'>
             <h1>Poland National Football Team Squad</h1>
             <h2>2022 Fifa World Cup</h2>
         </div>

        </>
    );
};
