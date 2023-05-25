import React, { SyntheticEvent, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { handleSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';
import useAppDispatch from '../hooks/useAppDispatch';

const Search = () => {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [value]);

    const debounceCallback = useCallback(
        debounce((inputValue) => {
            dispatch(handleSearchValue(inputValue));
        }, 1000),
        []
    );

    const setSearchValue = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
        debounceCallback(target.value);
    };

    const clearInput = () => {
        setValue('');
        dispatch(handleSearchValue(''));
    };

    return (
        <div className={styles.search}>
            <AiOutlineSearch className={styles.icon} />
            <input
                ref={inputRef}
                onChange={setSearchValue}
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
