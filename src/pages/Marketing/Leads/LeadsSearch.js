import React from 'react'
import { useStateContext } from '../../../contexts/ContextProvider';

const LeadsSearch = () => {
    const { currentColor } = useStateContext();

    return (
        <div>
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Search" />
                    </div>
                </div>
                <select className="select select-bordered join-item">
                    <option disabled selected>Filter</option>
                    <option>E-mail</option>
                    <option>Org. Name</option>
                </select>
                <div className="indicator">
                    {/* <span className="indicator-item badge badge-secondary">new</span> */}
                    <button style={{ backgroundColor: currentColor }} className="btn join-item">Search</button>
                </div>
            </div>
        </div>
    )
}

export default LeadsSearch