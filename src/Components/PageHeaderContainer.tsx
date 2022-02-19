import React from 'react';
import NavigationBar from './NavigationBar';
import VideoUploaderPanel from './VideoUploaderPanel';

interface PageHeaderContainerProps{
    pageHeaderNumber: number;
    sendIsZoomedIn : (isZoomedIn : boolean) => void;
}

const PageHeaderContainer : React.FunctionComponent<PageHeaderContainerProps> = (props) => {
    return (
        <div>
            <div>
                <NavigationBar 
                    currentPageNumber={props.pageHeaderNumber}
                />
                <VideoUploaderPanel
                    sendIsZoomedIn={props.sendIsZoomedIn}/>
            </div>
        </div>
    )
}

export default PageHeaderContainer
