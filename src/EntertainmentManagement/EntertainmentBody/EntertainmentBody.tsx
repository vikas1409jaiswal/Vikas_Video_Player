import React, { useEffect, useState } from 'react';
import { channels, getRowsBackgroundColor } from '../Constants/Channels';
import { 
    arrangeAlphabetically, 
    getTimeStamp, 
    malePerformersList, 
    femalePerformersList, 
    videoInfoDetails,
    getSiteNameArray, 
    getYearsArray,
    getFilteredTimeStamp
} from '../Utilities/ReusableFunctions';

import './EntertainmentBody.css';
import { EntertainmentTable } from './EntertainmentTable/EntertainmentTable';

export interface EntertainmentBodyProps {
}

export const EntertainmentBody: React.FunctionComponent<EntertainmentBodyProps> = (props) => {
    const [searchPerformer, setSearchPerformer] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [videoMode, setVideoMode] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(channels[0]);

    const totalMinutes = videoInfoDetails.map(v => parseInt(v.duration.slice(0, 2))).reduce((partialSum, a) => partialSum + a, 0);
    const totalSeconds = videoInfoDetails.map(v => parseInt(v.duration.slice(3, 5))).reduce((partialSum, a) => partialSum + a, 0);
    const timeStamp = getTimeStamp((totalMinutes*60) + totalSeconds);

    const handleOnChange = (e: any) => {
       setSearchPerformer(e.target.value);
    }

    const handleOnInput = (e: any) => {
        setSearchTitle(e.target.value);
     }

     const handlePageChange = (e: any) => {
        setPageNumber(parseInt(e.target.value as string))
     }

     const handlePerPageChange = (e: any) => {
        setPerPage(parseInt(e.target.value as string))
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
            videoInfoDetails.slice(videoInfoDetails.map(v => v.viewId).indexOf(perPage*(page - 1) + 1), videoInfoDetails.map(v => v.viewId).indexOf(perPage * page + 1))
            : videoInfoDetails.filter(v =>
                (searchTitle.length == 0 ? 
                (v.actressName.indexOf(searchPerformer) != -1 ||
                v.actorName.indexOf(searchPerformer) != -1 ||
                v.videoTitle.indexOf(
                    searchPerformer.slice(searchPerformer.indexOf('---') + 3)
                ) != -1 ||
                v.releaseDate.indexOf(searchPerformer) != -1) :
                v.videoTitle.toLowerCase().indexOf(searchPerformer.toLowerCase()) != -1)
            )

        return filteredResult;
    };

    return (
        <>
            <div className='video-classification'>
                <span>
                    <label>{'Total Videos'}</label>
                    <label>{videoInfoDetails.length - 1}</label>
                </span>
                {
                    channels.map(c =>
                        <span>
                            <label>{c}</label>
                            <label>{videoInfoDetails.filter(v => v.channelName === c).length}</label>
                        </span>)
                }
                <span>
                    <label>{'Total Watch Time'}</label>
                    <label>{
                    `${timeStamp[0]}:
                    ${timeStamp[1].toString().length === 1 ? '0'+ timeStamp[1] : timeStamp[1]}:
                    ${timeStamp[2].toString().length === 1 ? '0'+ timeStamp[2] : timeStamp[2]}`
                    }</label>
                </span>
            </div>
            <h1>
                {
                    videoInfoDetails.filter(v => v.releaseDate.indexOf(
                    `${new Date().toDateString().slice(8, 10)} ${new Date().toDateString().slice(4, 7)}`
                    ) != -1).map(p => <span  style={{fontSize: '14px'}}>
                        {`${p.videoTitle} celebrating ${2022 - parseInt(p.releaseDate.slice(7, 11))} years.`}
                        </span>)
                }
            </h1>
            <div className='video-search-criteria'>
                <div className='performer-search'>
                {
                    ['M', 'F'].map((g) =>
                        <div className={`serach-${g === 'F' ? 'female' : 'male'}-performer-dropdown`}>
                            <label>{g === 'F' ? 'Female' : 'Male'} Performers</label>
                            {selectDropdown(g)}
                        </div>
                    )
                }
                </div>
                <div className='select-site-name'>
                    <label>{'Select Site'}</label>
                    <select name='select-channel-name' id="channels" onChange={(e) => setSelectedChannel(e.target.value)}>
                        {
                          Array.from(new Set([...getSiteNameArray()
                            .map(s => s.slice(0, s.indexOf('-')))]))
                            .map(p => <option value={p}>
                                {p}
                            </option>)
                               
                        }
                    </select>
                    <select name='select-site-name' id="sites" onChange={handleOnChange}>
                        <option>{'...select site'}</option>
                        {
                            getSiteNameArray()
                                .filter(a => a.indexOf(selectedChannel) != -1)
                                .map(c => c.slice(c.indexOf('---') + 3))
                                .sort(arrangeAlphabetically)
                                .map(p => <option value={p}>
                                    {p}
                                </option>)
                        }
                    </select>
                </div>
                <div className='performer-search'>
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
                <div className='select-page'>
                   <div>
                   <label>{'Page'}</label>
                    <select name='select-page' id="page" onChange={handlePageChange} value={pageNumber}>
                        {
                            Array.from(Array(Math.floor(videoInfoDetails.length/perPage) + 1).keys())
                            .map(p => <option value={p + 1}>
                                    {p + 1}
                                </option>)
                        }
                    </select>
                   </div>
                   <div>
                   <label>{'Per Page'}</label>
                    <select name='select-per-page' id="per-page" onChange={handlePerPageChange} value={perPage}>
                        {
                            [10, 20, 30, 40, 50, 100, 250, 500]
                            .map(p => <option value={p}>
                                    {p}
                                </option>)
                        }
                    </select>
                   </div>
                </div>
                </div>
                <div className='search-title'>
                    <label>{'Select Title'}</label>
                    <div className='search-box'>
                    <input onChange={handleOnInput}/>
                   <button onClick={() => setSearchPerformer(searchTitle)}>{'Search'}</button>
                    </div>
                </div>
            </div>
            <div className='page-navigation'>
                <button onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}>{'Prev'}</button>
                <div>
                    <button onClick={() => setVideoMode(!videoMode)}>{'Video Mode On'}</button>
                    <div className='tool-tip'> View By Month
                        <span className="tool-tip-text">
                            {
                               <table className='view-by-month-table'>
                                   <thead>
                                       <tr>
                                           {['Month', 'Videos', 'Duration'].map(c => <th>{c}</th>)}
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {
                                           ['Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022'].map(
                                               m => <tr>
                                                   <td>
                                                       {m}
                                                   </td>
                                                   <td>
                                                       {videoInfoDetails.filter(v => v.viewDate.indexOf(m) != -1).length}
                                                   </td>
                                                   <td>
                                                       {
                                                       `${getFilteredTimeStamp(m)[0]}:
                                                        ${getFilteredTimeStamp(m)[1]}:
                                                        ${getFilteredTimeStamp(m)[2]}`                                                         
                                                       }
                                                   </td>
                                               </tr>
                                           )
                                       }
                                   </tbody>
                               </table>
                            }
                        </span>
                    </div>
                </div>
                <button onClick={() => setPageNumber(pageNumber + 1)}>{'Next'}</button>
            </div>
           {
              (searchPerformer.length === 0 ? [pageNumber] : [1]).map(p => 
                <EntertainmentTable 
                page={p}
                videoMode={videoMode}
                searchPerformer={searchPerformer}
                filteredVideoDetails={filteredVideoDetails(p)} />
              )
           }
        </>
    );
};
