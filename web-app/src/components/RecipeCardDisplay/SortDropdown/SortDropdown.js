import './SortDropdown.css'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import React, { useState } from 'react'

const options = ['A-Z', 'Health', 'Time', 'Cost', 'Servings'];

const SortDropdown = ({sortMethod, changeSortMethod}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    console.log('CURRENTLY, DROPDOWNOPEN IS ', dropdownOpen);

    const toggleDropdown = () => {
        console.log('TOGGLED');
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (option) => {
        changeSortMethod(option);
        setDropdownOpen(false);
    };

    return (
        <CDropdown autoClose={'inside'} onClick={toggleDropdown} show={dropdownOpen}>
            <CDropdownToggle color="secondary" caret>{sortMethod}</CDropdownToggle>
            <CDropdownMenu>
                {options.map((option) => option !== sortMethod ? <CDropdownItem onClick={() => handleOptionSelect(option)}>{option}</CDropdownItem>: undefined )}
            </CDropdownMenu>
        </CDropdown>

        // <div class="dropdown">
        //     <button class="btn btn-secondary dropdown-toggle" type="button" data-coreui-toggle="dropdown" aria-expanded="false">
        //         {sortMethod}
        //     </button>
        //     <ul class="dropdown-menu">
        //     <li><a class="dropdown-item" href="#">Action</a></li>
        //     <li><a class="dropdown-item" href="#">Another action</a></li>
        //     <li><a class="dropdown-item" href="#">Something else here</a></li>
        //     </ul>
        // </div>
    );
};

export default SortDropdown;