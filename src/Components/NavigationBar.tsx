import React, { useState } from 'react';
import SearchPanel from './SearchPanel';
import SideBarContainer from './SideBarContainer';

const NavigationBar : React.FunctionComponent = () => {
  
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
                                        Category
                            </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Category 1</a>
                                        <a className="dropdown-item" href="#">Category 2</a>
                                        <a className="dropdown-item" href="#">Category 3</a>
                                        <a className="dropdown-item" href="#">Category 4</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Special Category</a>
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
                            <SideBarContainer />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
