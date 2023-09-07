import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const PositionList = () => {
    const PositionData = [
        {
            name: 'CEO'
        },
        {
            name: 'Founder'
        },
        {
            name: 'IT Head'
        },
        {
            name: 'Officer 1'
        },
        {
            name: 'Developer'
        }
    ]
    return (
        <div>
            <div className="overflow-x-auto bg-base-200 p-5 rounded-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Position Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through companysData and generate rows */}
                        {PositionData.map((position, index) => (
                            <tr key={index}>
                                <td>{position.name}</td>
                                <th>
                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        <button>
                                            <AiFillDelete className="w-5 h-5" />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Position Name</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default PositionList