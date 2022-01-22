import React,{ useState } from 'react';
import PageFooterContainer from './PageFooterContainer';
import PageHeaderContainer from './PageHeaderContainer';
import RowContainer from './RowContainer';
import './PageBodyContainer.css';

interface PageBodyContainerProps{
  allSelectedFiles: (files: any[]) => void;
}

const PageBodyContainer : React.FunctionComponent<PageBodyContainerProps> = (props) => {

   const [currentPageNumber, setcurrentPageNumber] = useState(1);
   const [currentSelectedFiles, setcurrentSelectedFiles] = useState<any[]>([]);
   const [currentSelectedFileDetails, setcurrentSelectedFileDetails] = useState<string[]>([]);
   const [isZoomedInPlayer, setisZoomedInPlayer] = useState(false);

   const titleNumberByPageChange = 10*(currentPageNumber - 1);

   const cardTitleNumber : string[][] = 
          [[(titleNumberByPageChange + 1).toString(),
            (titleNumberByPageChange + 2).toString()],
           [(titleNumberByPageChange + 3).toString(),
            (titleNumberByPageChange + 4).toString()],
           [(titleNumberByPageChange + 5).toString(),
            (titleNumberByPageChange + 6).toString()],
           [(titleNumberByPageChange + 7).toString(),
            (titleNumberByPageChange + 8).toString()],
           [(titleNumberByPageChange + 9).toString(),
            (titleNumberByPageChange + 10).toString()]];

    return (
        <div className="card mb-3">
            <div className="card-header text-muted">
                <PageHeaderContainer 
                    pageHeaderNumber={currentPageNumber}
                    allSelectedFiles={(files) => {setcurrentSelectedFiles(files)}}
                    allSelectedFileDetails={(details => setcurrentSelectedFileDetails(details))}
                    currentSelectedFiles={currentSelectedFiles} 
                    currentSelectedFileDetails={currentSelectedFileDetails}
                    sendIsZoomedIn={(z) => setisZoomedInPlayer(z)}/>
            </div>
            <div className="card-body">
                {
                    cardTitleNumber.map(n =>
                        <RowContainer 
                            cardtitle={n}
                            currentSelectedFiles={currentSelectedFiles} 
                            currentSelectedFileDetails={currentSelectedFileDetails}
                            isZoomedInPlayer={isZoomedInPlayer}/>
                    )
                }
            </div>
            <div className="card-footer text-muted">
                <PageFooterContainer 
                    accessPageNumber={(n) =>{
                       setcurrentPageNumber(n)}}
                    currentPageNumber={currentPageNumber}/>
            </div>
        </div>
    )
}

export default PageBodyContainer
