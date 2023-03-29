import React from 'react';
import axios from 'axios';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';

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

const Content = () => {
    const [pizzas, setPizzas] = React.useState<Ipizza[]>([]);

    React.useEffect(() => {
        axios
            .get('https://642466119e0a30d92b1b018c.mockapi.io/items')
            .then((response) => setPizzas(response.data));
    }, []);

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {pizzas.map((pizza) => (
                        <PizzaBlock
                            key={pizza.id}
                            {...pizza}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Content;
