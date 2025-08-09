import React from 'react';
import {ButtonPair} from "./components/ButtonPair.tsx";
import {PageSearch} from "./components/PageSearch.tsx";

interface HeaderToolbarProps {
    searchText: string;
    onSearchTextChange: (newSearchText: string) => void;
    onAddClick: () => void;
    positiveText: string;
}

const HeaderToolbar: React.FC<HeaderToolbarProps> = ({searchText, onSearchTextChange, onAddClick, positiveText}) => {
    return (
        <div className='card-header border-bottom-0 mt-2'>
            <div className='card-toolbar w-100'>
                <div className='d-flex justify-content-between w-100'>
                    <PageSearch
                        searchText={searchText}
                        onSearchTextChange={onSearchTextChange}
                    />
                    <ButtonPair
                        positiveText={positiveText}
                        positiveAction={onAddClick}
                        showNegative={false}
                        positiveIcon={'plus'}
                        positiveClassName={'btn-info btn-sm  fw-bold hover-scale h-100 text-white'}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderToolbar;