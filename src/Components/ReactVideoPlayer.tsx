import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import VolumeController from './VideoComponents/VolumeController';
import './ReactVideoPlayer.css';

interface ReactVideoPlayerProps{
  selectedfile: any;
}

interface MediaStreamModel{
lastModified: number;
lastModifiedDate: object;
size: number;
name: string;
type: string;
webkitRelativePath: string;
}

const ReactVideoPlayer : React.FunctionComponent<ReactVideoPlayerProps> = () => {

    const [videoFilePaths, setvideoFilePaths] = useState<string[]>([]);
    const [allFiles, setallFiles] = useState<MediaStreamModel[]>([]);
    const [currentVideoPath, setcurrentVideoPath] = useState<string[]>(videoFilePaths.filter((m,i) => i==0));
    const [currentVideoIndex, setcurrentVideoIndex] = useState(0);
    const videoSequencer = [0,1,2,3,4];
    const [isplayingOnHover, setplayingOnHover] = useState(false);
    const [isplayingOnClick, setplayingOnClick] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(50);

    console.log(videoFilePaths);
    console.log(videoFilePaths.filter((m,i) => i==0));
    console.log(currentVideoPath);
    console.log(allFiles);

    const handleVideoUpload = (event: any) => {
        setallFiles(event);
        console.log(event.target.files);
        setallFiles(p => {
            p = [];
            var i = 0;
            while(i<event.target.files.length)
            {
              p.push({
                lastModified: parseInt(event.target.files[i].lastModified),
                lastModifiedDate: event.target.files[i].lastModifiedDate,
                size: parseInt(event.target.files[i].size),
                name: event.target.files[i].name.toString(),
                type: event.target.files[i].type.toString(),
                webkitRelativePath: event.target.files[i].webkitRelativePath.toString(),
            })
              i++;
            }     
            return p;});
         setvideoFilePaths(vp => {
            vp = [];
            var i = 0;
            while(i<event.target.files.length)
            {
              vp.push(URL.createObjectURL(event.target.files[i]));
              i++;
            }     
            return vp;})
    }

    const playNextVideo = () => {
        setcurrentVideoIndex(i => i+1)
    }

    const playPreviousVideo = () => {
        setcurrentVideoIndex(i => i-1)
    }

    const playVideoOnHover = () => {
      setplayingOnHover(false);
    }

    const pauseVideoOnHoverAway = () => {
      setplayingOnHover(false);
    }

    const playVideoOnClick = () => {
      setplayingOnClick(true);
    }

    const pauseVideoOnClick = () => {
      setplayingOnClick(false);
    }

    return (
      <div className='player-wrapper'>
        <input multiple type="file" name="files[]" onChange={handleVideoUpload} />
        <button onClick={playNextVideo}>Next Video</button>
        <button onClick={playPreviousVideo}>Previous Video</button>
        <div className="row row-react-player">
          <div className="col-sm-12">
            <header>{allFiles.filter((m,i)=> i === (currentVideoIndex)).map(m => m.name).toString()}</header>
            <ReactPlayer
              className='react-player'
              url={videoFilePaths.filter((m, i) => i === (currentVideoIndex))}
              width="100%"
              height="100%"
              onMouseOver={playVideoOnHover}
              onMouseOut={pauseVideoOnHoverAway}
              playing={isplayingOnHover ? isplayingOnHover : isplayingOnClick}
              playbackRate={isplayingOnHover ? 16 : 1}
              progressInterval={10000}
              volume={isplayingOnHover ? 0 : currentVolume}
              controls={true}
            />
          </div>
          <div className="col-sm-2">
            <button onClick={playVideoOnClick}>Play Video</button>
            <VolumeController currentVolume={(n) => { setCurrentVolume(n) }} />
          </div>
          <div className="col-sm-2">
            <button onClick={pauseVideoOnClick}>Pause Video</button>
          </div>
        </div>
      </div>
    )
}

export default ReactVideoPlayer
