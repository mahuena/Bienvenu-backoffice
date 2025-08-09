import React from "react";
import {KTIcon} from "./KTIcon.tsx";

type SearchProps = {
    searchText?: string
    onSearchTextChange: (text: string) => void,
    placeholder?: string
}


export const PageSearch: React.FC<SearchProps> = ({
                                                      searchText,
                                                      onSearchTextChange,
                                                      placeholder = 'Search...'
                                                  }) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearchTextChange) {
            onSearchTextChange(event.target.value)
        }
    }
    return (
        <>
            <form
                data-kt-search-element='form'
                className='position-relative bg-secondary rounded border ps-4 d-flex align-items-stretch'
                autoComplete='off'
            >
                <KTIcon
                    iconName='magnifier'
                    className='fs-2 text-lg-1 text-gray-500 position-absolute top-50 translate-middle-y ms-0'
                />

                <input
                    type='text'
                    className='form-control form-control-flush ps-10 form-control-sm'
                    name='search'
                    placeholder={placeholder}
                    data-kt-search-element='input'
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </form>
        </>
    );
};