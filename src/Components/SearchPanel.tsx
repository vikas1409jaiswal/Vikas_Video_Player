import React, { useContext } from 'react';
import { SearchVideoContext } from './PageBodyContainer';

const SearchPanel : React.FunctionComponent = () => {

    const searchText = useContext(SearchVideoContext);
    
    const handleSearchInputChange = (e: any) => {
       searchText.setSearchInput(e.target.value);
    }

    return (
        <div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchText.searchInput}
                    onChange={handleSearchInputChange} />
                <button className="btn btn-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchPanel
