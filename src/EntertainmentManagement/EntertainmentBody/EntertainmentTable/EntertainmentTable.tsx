import React from 'react';
import { getRowsBackgroundColor, VideoDetails } from '../../Constants/Channels';

import './EntertainmentTable.css';
import { VideoMode } from './VideoMode/VideoMode';

export interface EntertainmentTableProps {
    page: number;
    videoMode: boolean;
    searchPerformer: string,
    filteredVideoDetails: VideoDetails[]
}

export const EntertainmentTable: React.FunctionComponent<EntertainmentTableProps> = (props) => {
    const columns = ['S.N.', 'Title', 'Channel Name', 'Actres Name', 'Actor Name', 'Release Date', 'Duration', 'View Date'];
    const { page, videoMode, searchPerformer, filteredVideoDetails } = props;

    const printPerformersName = (performers: string) => {
        return (performers.indexOf('&') != -1 ?
        performers.split(' & ').map(a =>
            <label className='plate-label performer-name-label'>{a}</label>
        )
        : <label className='plate-label performer-name-label'>{performers}</label>)
    }

    return (
        <>
            <div className='details-table'>
                <table className='video-details-table'>
                    <>
                        {
                            (searchPerformer.length === 0) ?
                                <h3>Page - {page}</h3> :
                                <h6>
                                    {filteredVideoDetails.length + ' Results Found For ' + searchPerformer}
                                </h6>
                        }
                        {
                            <>
                                <thead>
                                    <tr>
                                        {columns.map(i => <th>{i}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredVideoDetails.map((v, i) => <tr style={
                                            { backgroundColor: getRowsBackgroundColor(v.channelName) }
                                        }>
                                            <td><label className='plate-label id-label'>{v.viewId}</label></td>
                                            <td>
                                                <a href={v.channelPageUrl}>
                                                    <label className='tool-tip'>
                                                        <label className='title-plate'> {v.videoTitle} </label>
                                                        <span className="tool-tip-text">
                                                           {
                                                               videoMode ? 
                                                               <VideoMode />:
                                                            v.description.length > 0 ? v.description : 'Not Available'
                                                           }
                                                        </span>
                                                    </label>
                                                </a>
                                            </td>
                                            <td><label className='channel-name-label'>{v.channelName}</label></td>
                                            <td>{printPerformersName(v.actressName)}</td>
                                            <td>{printPerformersName(v.actorName) }</td>
                                            <td>
                                                <label className='plate-label' style={{ backgroundColor: 'blue' }}>
                                                    {v.releaseDate ? v.releaseDate : 'NA'}
                                                </label>
                                            </td>
                                            <td>
                                                <label className='plate-label' style={{ backgroundColor: 'brown' }}>
                                                    {v.duration}
                                                </label>
                                            </td>
                                            <td>
                                                <label className='plate-label' style={{ backgroundColor: 'purple' }}>
                                                    {v.viewDate.length != 0 ? v.viewDate : 'NA'}
                                                </label>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </>
                        }
                    </>
                </table>
            </div>
        </>
    );
};
