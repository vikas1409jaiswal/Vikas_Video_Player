import React from 'react';
import NavigationBar from './NavigationBar';
import VideoUploaderPanel from './VideoUploaderPanel';

interface PageHeaderContainerProps{
    pageHeaderNumber: number;
    allSelectedFiles: (files: any[]) => void;
    allSelectedFileDetails: (fileDetails: string[]) => void; 
    sendIsZoomedIn : (isZoomedIn : boolean) => void;
}

const PageHeaderContainer : React.FunctionComponent<PageHeaderContainerProps> = (props) => {
    return (
        <div>
            <div>
                <NavigationBar />
                <VideoUploaderPanel allSelectedFiles={props.allSelectedFiles}
                                    allSelectedFileDetails={props.allSelectedFileDetails}
                                    sendIsZoomedIn={props.sendIsZoomedIn}/>
            </div>
        </div>
    )
}

export default PageHeaderContainer
