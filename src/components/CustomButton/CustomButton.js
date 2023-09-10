import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

const CustomButton = ({ color, text, onClick }) => {
    const { currentcolor } = useStateContext()
    return (
        <button
            style={{ backgroundColor: color }}
            type="submit"
            className="btn m-auto block text-white"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;
