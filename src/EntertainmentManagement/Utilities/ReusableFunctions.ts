import {videoInfos} from './../DataFiles/Page-1';
import {videoInfos2} from './../DataFiles/Page-2';

export const videoInfoDetails = [...videoInfos, ...videoInfos2];

export const arrangeAlphabetically = (a: string, b: string) => {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

export const getTimeStamp = (totalSeconds: number) => {
   const seconds = totalSeconds % 3600;
   const minutes = (totalSeconds - seconds) % 60;
   const hours = (totalSeconds - (minutes*60) - seconds) / 3600;

   return [hours, minutes, seconds];
}

export const getSingleNameArray = (videoInfoDetails: any[], gender: string = 'M') => {
    let performersList = gender === 'F' ? [...videoInfoDetails.map(v => v.actressName)] : [...videoInfoDetails.map(v => v.actorName)];
    const multiPerformerList = performersList.filter(p => p.indexOf('&') != -1);
    const remainingPerformers: string[] = [];

    multiPerformerList.map(m => m.split(' & ')).map(a => a.map(
        (p: any) => remainingPerformers.push(p)
    ))

    return [...performersList, ...remainingPerformers];
}

export const getSiteNameArray = () => {
  const videoTitles = videoInfoDetails.map(v => (v.channelName + '---' + v.videoTitle));
  const siteNames = videoTitles.filter(t => t.indexOf(' - ') != -1 ).map(t => t.slice(0, t.indexOf(' - ') + 1));
  return Array.from(new Set([...siteNames]))
}

export const getYearsArray = () => {
    const releaseDates = videoInfoDetails.map(v => (v.releaseDate));
    const releaseYears = releaseDates.filter(d => d.length > 0).map(d =>  d.slice(7, 11));
    return Array.from(new Set([...releaseYears]))
  }

export const malePerformersList = getSingleNameArray(videoInfoDetails);
export const femalePerformersList = getSingleNameArray(videoInfoDetails, 'F');