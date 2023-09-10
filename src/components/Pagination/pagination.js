import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 8 }) => {
    const { currentColor } = useStateContext();
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const getPageButtons = () => {
        if (totalPages <= maxVisiblePages) {
            return pageNumbers;
        } else {
            const firstPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const lastPage = Math.min(totalPages, firstPage + maxVisiblePages - 1);

            const pageButtons = [];

            pageButtons.push(1);

            if (firstPage > 2) {
                pageButtons.push('...');
            }

            for (let i = firstPage; i <= lastPage; i++) {
                pageButtons.push(i);
            }

            if (lastPage < totalPages - 1) {
                pageButtons.push('...');
            }

            pageButtons.push(totalPages);

            return pageButtons;
        }
    };

    return (
        <div className="flex justify-center my-4">
            <button style={{ backgroundColor: currentColor }} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn mx-2 text-white">
                Previous
            </button>
            {getPageButtons().map((page, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(page)}
                    style={{ backgroundColor: currentColor }}
                    className={`btn mx-2 ${currentPage === page ? 'text-white' : ''}`}
                >
                    {page}
                </button>
            ))}
            <button style={{ backgroundColor: currentColor }} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn mx-2 text-white">
                Next
            </button>
        </div>
    );
};

export default Pagination;
