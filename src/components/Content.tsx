import React from 'react';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
import pizzas from '../assets/pizzas.json';

const Content = () => (
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

export default Content;
