import React from 'react';
import NavigationBar from './NavigationBar';
import VideoUploaderPanel from './VideoUploaderPanel';

interface PageHeaderContainerProps{
    pageHeaderNumber: number;
    allSelectedFiles: (files: any[]) => void;
    allSelectedFileDetails: (fileDetails: string[]) => void; 
    sendIsZoomedIn : (isZoomedIn : boolean) => void;
    currentSelectedFiles: any[]; 
    currentSelectedFileDetails: string[];
}

const PageHeaderContainer : React.FunctionComponent<PageHeaderContainerProps> = (props) => {
    return (
        <div>
            <div>
                <NavigationBar 
                    currentPageNumber={props.pageHeaderNumber}
                    currentSelectedFiles={props.currentSelectedFiles} 
                    currentSelectedFileDetails={props.currentSelectedFileDetails}/>
                <VideoUploaderPanel 
                    allSelectedFiles={props.allSelectedFiles}
                    allSelectedFileDetails={props.allSelectedFileDetails}
                    sendIsZoomedIn={props.sendIsZoomedIn}/>
            </div>
        </div>
    )
}

export default PageHeaderContainer
