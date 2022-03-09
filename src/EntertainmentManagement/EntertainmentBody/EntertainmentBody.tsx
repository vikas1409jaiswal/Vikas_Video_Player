import React, { useState } from 'react';
import { channels, getRowsBackgroundColor } from '../Constants/Channels';
import { 
    arrangeAlphabetically, 
    getTimeStamp, 
    malePerformersList, 
    femalePerformersList, 
    videoInfoDetails,
    getSiteNameArray, 
    getYearsArray
} from '../Utilities/ReusableFunctions';

import './EntertainmentBody.css';

export interface EntertainmentBodyProps {
}

export const EntertainmentBody: React.FunctionComponent<EntertainmentBodyProps> = (props) => {
    const columns = ['S.N.', 'Title', 'Channel Name', 'Actres Name', 'Actor Name', 'Release Date', 'Duration', 'View Date'];
    const [searchPerformer, setSearchPerformer] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [showTable, setShowTable] = useState([true, true]);

    const totalMinutes = videoInfoDetails.map(v => parseInt(v.duration.slice(0, 2))).reduce((partialSum, a) => partialSum + a, 0);
    const totalSeconds = videoInfoDetails.map(v => parseInt(v.duration.slice(3, 5))).reduce((partialSum, a) => partialSum + a, 0);
    const timeStamp = getTimeStamp((totalMinutes*60) + totalSeconds);

    const handleOnChange = (e: any) => {
       setSearchPerformer(e.target.value);
    }

    const handleOnInput = (e: any) => {
        setSearchTitle(e.target.value);
     }

  const selectDropdown = (gender: string = 'M') => {
    const performerList = gender === 'F' ? femalePerformersList : malePerformersList;
  return  (
  <select name={`${gender==='F'?'female':'male'}-performer-select`} id="stars" onChange={handleOnChange}>
    {performerList.filter((m, i) => {
        return (performerList.indexOf(m) === i) && (m.indexOf('&') === -1);
    })
        .sort(arrangeAlphabetically)
        .map(p => p.length > 0 && <option value={p}>
            {p}
            {' (' + performerList.filter(x => x.indexOf(p) != -1 && x.indexOf('&') === -1).length + ')'}
        </option>)
    }
  </select>
  )}

    const filteredVideoDetails = (page: number) => {
       const filteredResult = searchPerformer.length === 0 ?
            videoInfoDetails.slice(videoInfoDetails.map(v => v.viewId).indexOf(100 * page - 99), videoInfoDetails.map(v => v.viewId).indexOf(100 * page + 1))
            : videoInfoDetails.filter(v =>
                (searchTitle.length == 0 && (v.actressName.indexOf(searchPerformer) != -1 ||
                v.actorName.indexOf(searchPerformer) != -1 ||
                v.videoTitle.indexOf(
                    searchPerformer.slice(searchPerformer.indexOf('---') + 3)
                ) != -1 ||
                v.releaseDate.indexOf(searchPerformer) != -1)) ||
               ( v.videoTitle.includes(searchPerformer))
            )

        console.log(searchPerformer)
        console.log(filteredResult);
        return filteredResult;
    };

    return (
        <>
            <div className='video-classification'>
                {
                    channels.map(c =>
                        <span>
                            <label>{c}</label>
                            <label>{videoInfoDetails.filter(v => v.channelName === c).length}</label>
                        </span>)
                }
                <span>
                    <label>{'Total Watch Time'}</label>
                    <label>{`${timeStamp[0]}:${timeStamp[1]}:${timeStamp[2]}`}</label>
                </span>
            </div>
            <div className='video-search-criteria'>
                {
                    ['M', 'F'].map((g) =>
                        <div className={`serach-${g === 'F' ? 'female' : 'male'}-performer-dropdown`}>
                            <label>{g === 'F' ? 'Female' : 'Male'} Performers</label>
                            {selectDropdown(g)}
                        </div>
                    )
                }
                <div className='select-site-name'>
                    <label>{'Select Site'}</label>
                    <select name='select-site-name' id="sites" onChange={handleOnChange}>
                        {
                            getSiteNameArray()
                                .sort(arrangeAlphabetically)
                                .map(p => <option value={p}>
                                    {p}
                                </option>)
                        }
                    </select>
                </div>
                <div className='select-year'>
                    <label>{'Select Year'}</label>
                    <select name='select-year' id="year" onChange={handleOnChange}>
                        {
                            getYearsArray()
                                .sort(arrangeAlphabetically)
                                .map(p => <option value={p}>
                                    {p}
                                </option>)
                        }
                    </select>
                </div>
                <div className='search-title'>
                    <label>{'Select Title'}</label>
                    <div className='search-box'>
                    <input onChange={handleOnInput}/>
                   <button onClick={() => setSearchPerformer(searchTitle)}>{'Search'}</button>
                    </div>
                </div>
            </div>
            <div className='details-table'>
                <table className='video-details-table'>
                    {(searchPerformer.length === 0 ? [1, 2] : [1]).map((p, i) =>
                        <>
                            {(searchPerformer.length === 0) ? <h3 onClick={() => {
                                setShowTable([
                                    (i === 0 ? !showTable[i] : showTable[i]),
                                    (i === 1 ? !showTable[i] : showTable[i])
                                ])
                            }}>Page - {p}</h3> :
                                <h6>
                                    {filteredVideoDetails(p).length + ' Results Found For ' + searchPerformer}
                                </h6>}
                            {
                                showTable[i] &&
                                <>
                                    <thead>
                                        <tr>
                                            {columns.map(i => <th>{i}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredVideoDetails(p).map((v, i) => <tr style={
                                                { backgroundColor: getRowsBackgroundColor(v.channelName) }
                                            }>
                                                <td><label className='plate-label id-label'>{v.viewId}</label></td>
                                                <td>
                                                    <a href={v.videoUrl}>
                                                        <label className='tool-tip'>
                                                            {v.videoTitle}
                                                            <span className="tool-tip-text">
                                                                {v.description.length > 0 ? v.description : 'Not Available'}
                                                            </span>
                                                        </label>
                                                    </a>
                                                </td>
                                                <td><label className='channel-name-label'>{v.channelName}</label></td>
                                                <td>{
                                                    v.actressName.indexOf('&') != -1 ?
                                                        v.actressName.split(' & ').map(a =>
                                                            <label className='plate-label performer-name-label'>{a}</label>
                                                        )
                                                        : <label className='plate-label performer-name-label'>{v.actressName}</label>
                                                }</td>
                                                <td>{
                                                    v.actorName.indexOf('&') != -1 ?
                                                        v.actorName.split(' & ').map(a =>
                                                            <label className='plate-label performer-name-label'>{a}</label>
                                                        )
                                                        : <label className='plate-label performer-name-label'>{v.actorName}</label>
                                                }</td>
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
                    )}
                </table>
            </div>
        </>
    );
};
