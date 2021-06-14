import React from 'react';
import './PaginationBlock.css';

interface PaginationBlockProps{
    pagenumber: number;
    accessPageNumber: (clickedPageNumber : number) => void;
}

const PaginationBlock:React.FunctionComponent<PaginationBlockProps> = (props) => {
    return (
        <div className="pagination-block">
           <button className="btn btn-success page-button" onClick={() =>{
              props.accessPageNumber(props.pagenumber);
              }}>
               <h6 className="page-value">{props.pagenumber}</h6>
           </button> 
        </div>
    )
}

export default PaginationBlock
