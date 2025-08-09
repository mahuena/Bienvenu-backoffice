import {useState} from "react";

export const usePageSearchHelpers = <T extends object>(data: T[] | undefined | null, initialSearchText: string = '') => {
    const [searchText, setSearchText] = useState(initialSearchText);

    const safeData = Array.isArray(data) ? data : [];

    const filteredData = safeData.filter((item) => {
        const values = Object.values(item);
        return values.some((value) => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchText.toLowerCase());
            }
            if (typeof value === 'number') {
                return value.toString().toLowerCase().includes(searchText.toLowerCase());
            }
            return false;
        });
    });

    return {filteredData, setSearchText, searchText};
};
