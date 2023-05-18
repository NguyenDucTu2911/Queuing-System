import React, { useEffect, useState } from 'react';
import './Dropdown.scss'
interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

    //chọn value đầu tiên
    useEffect(() => {
        if (options.length > 0) {
            setSelectedOption(options[0]);
            onSelect(options[0].value);
        }
    }, []);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: DropdownOption) => {
        setSelectedOption(option);
        onSelect(option.value);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption ? selectedOption.label : 'Chọn'}
                <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>
                    <i className="fa-solid fa-caret-down" style={{ color: "#FF7506" }}></i>
                </span>
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option) => (
                        <li className='dropdown-item' key={option.value} onClick={() => handleOptionSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
