/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, itemType, selectCard } from '../../redux/slices/cartSlice';

interface Iprops {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

const pizzaType: [string, string] = ['Тонкое', 'Традиционное'];

const getCount = (currentID: number, items: itemType[]) =>
    items
        .filter(({ id }) => id === currentID)
        .reduce((acc, { count }) => (acc += count), 0);

const PizzaBlock: React.FC<Iprops> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types
}) => {
    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(0);
    const dispatch = useDispatch();
    const { items } = useSelector(selectCard);

    const addProduct = () => {
        const product = {
            id,
            title,
            price,
            imageUrl,
            type: pizzaType[activeType],
            size: sizes[activeSize],
            count: 1
        };

        dispatch(addItem(product));
    };

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeID: number, index: number) => (
                        <li
                            onClick={() => setActiveType(index)}
                            className={typeID === activeType ? 'active' : ''}
                            key={index}
                        >
                            {pizzaType[typeID]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((value: number, index: number) => (
                        <li
                            onClick={() => setActiveSize(index)}
                            className={index === activeSize ? 'active' : ''}
                            key={index}
                        >
                            {`${value} см.`}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{`от ${price} ₽`}</div>
                <button
                    type="button"
                    className="button button--outline button--add"
                    onClick={addProduct}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{getCount(id, items)}</i>
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
