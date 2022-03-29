import React from 'react';
import ReactPlayer from 'react-player';
import { performers1 } from './../../../DataFiles/Performers/Performers-1';

import './VideoMode.css';

export interface VideoModeProps {

}

export const VideoMode: React.FunctionComponent<VideoModeProps> = (props) => {
    let URL = window.URL
    let blob = new Blob(['file:///E:/COMPUTER%20COURSES/Kudvenkat/github/01.Git%20and%20GitHub%20Introduction.mp4'], {type : 'video/mp4'}); 
    let src = URL.createObjectURL(blob);

    console.log(src);

    return (
        <>
            <div className='video-content-container'>
                <ReactPlayer
                    playing
                    className='react-player'
                    url={src}
                    width='100%'
                    height='100%'
                />
            </div>
        </>
    );
};
