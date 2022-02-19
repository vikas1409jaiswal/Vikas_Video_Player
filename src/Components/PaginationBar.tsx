import React,{ useState } from 'react';
import PaginationBlock from './PaginationBlock';
import './PaginationBar.css';

interface PaginationBarProps{
    accessPageNumber: (clickedPageNumber :number) => void;
    currentPageNumber: number;
}

const PaginationBar : React.FunctionComponent<PaginationBarProps> = (props) => {
    const [initialPageNumber, setinitialPageNumber] = useState(1);
    const [previewInputValue, setpreviewInputValue] = useState(props.currentPageNumber.toString());
    const pageNumbers: number[] = [
    initialPageNumber + 0,
    initialPageNumber + 1,
    initialPageNumber + 2,
    initialPageNumber + 3,
    initialPageNumber + 4,
    initialPageNumber + 5,
    initialPageNumber + 6,
    initialPageNumber + 7,
    initialPageNumber + 8,
    initialPageNumber + 9,
    initialPageNumber + 10,
    initialPageNumber + 11];

    const decrementPageNumber = () => {
      if(initialPageNumber > 1)
        setinitialPageNumber(initialPageNumber - 1);
    };

    const incrementPageNumber = () => {
        setinitialPageNumber(initialPageNumber + 1);
    };

    return (
        <>
            <div className="row pagination-bar-container">
                <div className="col-sm-1">
                    <button className="btn btn-primary dec-page-number" onClick={decrementPageNumber}>Prev{'<<'}</button>
                </div>
                <div className="row col-sm-10 pagination-bar-plate">
                   <div className="pagination-blocks">
                   {pageNumbers.map(p =>                       
                            <PaginationBlock pagenumber={p}
                                accessPageNumber={props.accessPageNumber}
                            />
                    )}
                   </div>
                </div>
                <div className="col-sm-1">
                    <button className="btn btn-primary inc-page-number" onClick={incrementPageNumber}>Next{'>>'}</button>
                </div>
            </div>
            <div className="row page-input">
                <div className="col-sm-5">
                </div>
                <div className="input-group col-sm-2">
                    <div className="input-group-prepend">
                        <input type="text"
                            className="form-control"
                            value={previewInputValue.toString()}
                            onChange={(e) => {
                                parseInt(e.target.value) > 0 ?
                                    setpreviewInputValue(e.target.value) :
                                    setpreviewInputValue("")
                            }}>
                        </input>
                        <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                                props.accessPageNumber(parseInt(previewInputValue));
                                setinitialPageNumber(parseInt(previewInputValue));
                            }}>
                            GoTo
                        </button>
                    </div>
                </div>
                <div className="col-sm-5">
                </div>
            </div>
            </>
    )
}

export default PaginationBar
