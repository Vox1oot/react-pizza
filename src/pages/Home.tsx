import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock, { Skeleton } from '../components/PizzaBlock';
import MyURL from '../utils/MyURL';

interface Ipizza {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

const sortList = [
    { id: 0, name: 'популярности', type: 'rating' },
    { id: 1, name: 'цене', type: 'price' },
    { id: 2, name: 'алфавиту', type: 'title' },
];

const link = new MyURL();

const Home = () => {
    const [pizzas, setPizzas] = React.useState<Ipizza[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [categoryID, setCategoryID] = React.useState<number>(0);
    const [sortID, setSortID] = React.useState<number>(0);

    React.useEffect(() => {
        if (!isLoading) {
            setLoading(true);
        }

        const sortedList = sortList.find(({ id }) => id === sortID);

        if (sortedList?.type !== undefined) {
            link.sortType = sortedList.type;
        }

        if (categoryID > 0) {
            link.setCategory = categoryID;
        } else {
            link.deleteSearParam('category');
        }

        console.log(link.url);

        axios
            .get(link.url)
            .then((response) => {
                setPizzas(response.data);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryID, sortID]);
    return (
        <>
            <div className="content__top">
                <Categories value={categoryID} handleActive={setCategoryID} />
                <Sort list={sortList} value={sortID} onChangeSort={setSortID} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading
                // eslint-disable-next-line react/no-array-index-key
                    ? [...new Array(6)].map((elem, index) => <Skeleton key={index} />)
                    : pizzas.map((pizza) => (
                        <PizzaBlock
                            key={pizza.id}
                            {...pizza}
                        />
                    ))}
            </div>
        </>
    );
};

export default Home;
