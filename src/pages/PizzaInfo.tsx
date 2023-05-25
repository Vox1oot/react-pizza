import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchPizzaInfo, selectPizza } from '../redux/slices/pizzaSlice';
import useAppDispatch from '../components/hooks/useAppDispatch';

const PizzaInfo = () => {
    const { id } = useParams();
    const { pizzaInfo } = useSelector(selectPizza);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (id) {
            dispatch(fetchPizzaInfo(id));
        }
    }, []);

    return (
        <div className="container">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                itaque voluptatibus ratione cum reprehenderit dolorem odit
                dignissimos pariatur eos. Accusamus repellendus quia saepe
                minima aliquid ratione dolores nam molestias sit.
            </p>
        </div>
    );
};

export default PizzaInfo;
