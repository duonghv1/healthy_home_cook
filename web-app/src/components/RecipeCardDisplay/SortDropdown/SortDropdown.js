import './SortDropdown.css'
import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const options = ['A-Z', 'Health', 'Time', 'Cost', 'Servings'];

const sortMethods = {'A-Z': 'title', 'Health': 'healthScore', 'Time': 'readyInMinutes', 'Cost': 'pricePerServing', 'Servings': 'servings'};

const SortDropdown = ({sortMethod, changeSortMethod}) => {
    const handleOptionSelect = (option) => {
        changeSortMethod(option.target.value);
    };

    return (
        // <CDropdown autoClose={'inside'} onClick={toggleDropdown} show={dropdownOpen}>
        //     <CDropdownToggle color="secondary" caret>{sortMethod}</CDropdownToggle>
        //     <CDropdownMenu>
        //         {options.map((option) => option !== sortMethod ? <CDropdownItem onClick={() => handleOptionSelect(option)}>{option}</CDropdownItem>: undefined )}
        //     </CDropdownMenu>
        // </CDropdown>

        <FormControl fullWidth>
            <InputLabel id="recipe-card-sort-label" sx={{fontFamily: 'Alice',}}>Sort by</InputLabel>
            <Select 
                labelId='recipe-card-sort-select-label'
                id='recipe-card-sort-select'
                value={sortMethod}
                label='SELECTED OPTION HERE'
                onChange={handleOptionSelect}
                sx={{
                    fontSize: '22.5px',
                    fontFamily: 'Alice',
                    color: 'black',
                    width: '150px',
                    height: '50px'
                }}
            >
                {options.map((option) => <MenuItem value={sortMethods[option]} style={{fontSize: '20px'}} sx={{fontFamily: 'Alice',}}>{option}</MenuItem>)};
            </Select>
        </FormControl>
    );
};

export default SortDropdown;