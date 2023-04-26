import React, { SyntheticEvent, ChangeEvent, useCallback } from 'react';

import debounce from 'lodash.debounce';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import styles from './Search.module.scss';
import SearchContext from '../Context';

const Search = () => {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [value]);

    const debounceCallback = useCallback(
        debounce((inputValue) => {
            setSearchValue(inputValue);
        }, 1000),
        []
    );

    const handleSearchValue = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
        debounceCallback(target.value);
    };

    const clearInput = () => {
        setValue('');
        setSearchValue('');
    };

    return (
        <div className={styles.search}>
            <AiOutlineSearch className={styles.icon} />
            <input
                ref={inputRef}
                onChange={handleSearchValue}
                value={value}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы"
            />
            {value && (
                <GrFormClose onClick={clearInput} className={styles.close} />
            )}
        </div>
    );
};

export default Search;
