import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock, { Skeleton } from '../components/PizzaBlock';

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

const Home = () => {
    const [pizzas, setPizzas] = React.useState<Ipizza[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        axios
            .get('https://642466119e0a30d92b1b018c.mockapi.io/items')
            .then((response) => {
                setPizzas(response.data);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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
