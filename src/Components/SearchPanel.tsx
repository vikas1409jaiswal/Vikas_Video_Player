import React from 'react'

const SearchPanel : React.FunctionComponent = () => {
    return (
        <div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchPanel
