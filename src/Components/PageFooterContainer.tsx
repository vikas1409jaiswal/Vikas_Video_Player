import React from 'react'
import PaginationBar from './PaginationBar'
import PaginationBlock from './PaginationBlock'

interface PageFooterContainerProps{
  accessPageNumber: (clickedPageNumber :number) => void;
  currentPageNumber: number;
}


const PageFooterContainer :React.FunctionComponent<PageFooterContainerProps> = (props) => {
    return (
        <div className="row">
          <div className="col-sm-12">
             <PaginationBar accessPageNumber={props.accessPageNumber}
                            currentPageNumber={props.currentPageNumber}/>
          </div>
        </div>
    )
}

export default PageFooterContainer
