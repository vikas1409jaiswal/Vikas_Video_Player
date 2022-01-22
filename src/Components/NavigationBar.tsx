import React, { useState } from 'react';
import AlphabetSelectionPanel from './AlphabetSelectionPanel';
import SearchPanel from './SearchPanel';
import SideBarContainer from './SideBarContainer';

interface NavigationBarProps{
    currentPageNumber: number;
    currentSelectedFiles: any[]; 
    currentSelectedFileDetails: string[];
}

const NavigationBar : React.FunctionComponent<NavigationBarProps> = (props) => {
  
    const [isSideBarVisible, setisSideBarVisible] = useState(false);

    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => setisSideBarVisible(!isSideBarVisible)}>Alphabetical</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Selected Videos
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {props.currentSelectedFiles.map((sf, i) => {
                                            var highlightColor ='white';
                                            if (i < props.currentPageNumber*10 && i>= (props.currentPageNumber -1)*10){
                                                highlightColor= 'orange'
                                            }
                                       return (<div className="dropdown-option" style={{backgroundColor: highlightColor}}>
                                            <a className="dropdown-item" href="#">
                                            {sf}
                                            </a>
                                        </div>)
                                        })}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Special Category</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Page Videos
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {props.currentSelectedFiles.filter((f,i) => i < props.currentPageNumber*10 && i>= (props.currentPageNumber -1)*10).map((sf, i) => {                                            
                                       return (<div className="dropdown-option">
                                            <a className="dropdown-item" href="#">
                                            {sf}
                                            </a>
                                        </div>)
                                        })}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <SearchPanel />
                        </div>
                    </nav>
                </div>
            </div>
            <div>
                <div>
                    {
                        isSideBarVisible ?
                            <AlphabetSelectionPanel/>// <SideBarContainer />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
