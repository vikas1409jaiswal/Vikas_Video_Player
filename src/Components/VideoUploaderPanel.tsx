import { Select } from '@material-ui/core';
import React, { useState } from 'react';

interface VideoUploaderPanelProps{
    allSelectedFiles: (files: any[]) => void;
    allSelectedFileDetails: (fileDetails: string[]) => void;
    sendIsZoomedIn : (isZoomedIn : boolean) => void;
}

const VideoUploaderPanel : React.FunctionComponent<VideoUploaderPanelProps> = (props) => {

    const [videoFilePaths, setvideoFilePaths] = useState<string[]>([]);
    const [allFiles, setallFiles] = useState<any[]>([]);
    const [isZoomSelectionOpen, setZoomSelection] = useState(false);
    const [isZoomedIn, setisZoomedIn] = useState(false);

    const handleVideoUpload = (event: any) => {
        console.log(event.target.files);
        setallFiles(p => {
            p = [];
            var i = 0;
            while(i<event.target.files.length)
            {
              p.push(event.target.files[i].name); 
              i++;
            }     
            return p;});
        props.allSelectedFiles(allFiles);
        setvideoFilePaths(vp => {
            vp = [];
            var i = 0;
            while(i<event.target.files.length)
            {
              vp.push(URL.createObjectURL(event.target.files[i]));
              i++;
            }     
            return vp;})
        props.allSelectedFileDetails(videoFilePaths); 
            
    }
    
    return (
        <div className="row">
          <div className="col-sm-4">
             <input multiple type="file" name="files[]" onChange={handleVideoUpload}/>
          </div>
          <div className="col-sm-4">
             <>
            <button className="btn btn-primary btn-sm" 
            onClick={() => {
              setZoomSelection(!isZoomSelectionOpen);
            }}
            >Zoom Player</button>
             </>
            { isZoomSelectionOpen &&
         <>
         <div className="row">
          <div className="col-sm-6">
          <button className="btn btn-danger btn-sm" 
          onClick={() => {
            setisZoomedIn(true);
            props.sendIsZoomedIn(isZoomedIn);
          }}>ZoomIn</button>
          </div>
          <div className="col-sm-6">
          <button className="btn btn-danger btn-sm" 
          onClick={() => {
            setisZoomedIn(false);
            props.sendIsZoomedIn(isZoomedIn);
          }}>ZoomOut</button>
          </div>
          </div>
          </>
          }
          </div>
        </div>
    )
}

export default VideoUploaderPanel
