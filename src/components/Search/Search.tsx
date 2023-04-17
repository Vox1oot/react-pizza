import React from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import styles from './Search.module.scss';
import SearchContext from '../Context';

const Search = () => {
    const { searchValue, setSearchValue } = React.useContext(SearchContext);

    return (
        <div className={styles.search}>
            <AiOutlineSearch className={styles.icon} />
            <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы"
            />
            {searchValue && (
                <GrFormClose
                    onClick={() => setSearchValue('')}
                    className={styles.close}
                />
            )}
        </div>
    );
};

export default Search;
