/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import SearchContext from './components/Context';
import './scss/app.scss';

const App: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <Content />
            </SearchContext.Provider>
        </div>
    );
};

export default App;
