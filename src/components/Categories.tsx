/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { handleCategoryID } from '../redux/slices/filterSlice';

interface ICategories {
    value: number;
}

const categories = [
    { id: 0, name: 'Все' },
    { id: 1, name: 'Мясные' },
    { id: 2, name: 'Вегетарианская' },
    { id: 3, name: 'Гриль' },
    { id: 4, name: 'Острые' },
    { id: 5, name: 'Закрытые' }
];

const Categories: React.FC<ICategories> = ({ value }) => {
    const dispatch = useDispatch();
    const classActive = (id: number) => cn({ active: id === value });

    return (
        <div className="categories">
            <ul>
                {categories.map(({ id, name }) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                        className={classActive(id)}
                        key={id}
                        onClick={() => dispatch(handleCategoryID(id))}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
