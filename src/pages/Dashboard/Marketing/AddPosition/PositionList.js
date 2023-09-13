import React, { useState } from 'react';
import axios from 'axios';
import { QueryClient, useQuery } from 'react-query';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const PositionList = () => {
    const [deletingPositionId, setDeletingPositionId] = useState(null);

    const fetchPositions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/add-positions');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch positions: ' + error.message);
        }
    };

    const queryClient = new QueryClient();

    const { data: positionData, isLoading, isError, refetch } = useQuery(
        'positions',
        fetchPositions
    );

    const deletePosition = async (positionId) => {
        try {
            setDeletingPositionId(positionId);

            await axios.delete(`http://localhost:5000/api/add-positions/${positionId}`);

            setDeletingPositionId(null);

            refetch();
        } catch (error) {
            setDeletingPositionId(null);
            console.error('Error deleting position:', error);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p className="text-center">
                    <span className="loading loading-ring loading-lg"></span>
                </p>
            ) : isError ? (
                <p>Error fetching positions</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Position Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {positionData.map((position) => (
                            <tr key={position._id}>
                                <td className="">{position.positionName}</td>
                                <th>
                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        {deletingPositionId === position._id ? (
                                            <span className="loading loading-sm"></span>
                                        ) : (
                                            <button
                                                onClick={() => deletePosition(position._id)}
                                                disabled={deletingPositionId === position._id}
                                            >
                                                <AiFillDelete className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PositionList;
