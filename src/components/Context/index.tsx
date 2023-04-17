import React from 'react';

interface ISearchContextProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const SearchContext = React.createContext<ISearchContextProps>({
    searchValue: '',
    setSearchValue: () => undefined
});
export default SearchContext;
