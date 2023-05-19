import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFilter } from '../redux/slices/filterSlice';
import { selectPizza, fetchPizzas } from '../redux/slices/pizzaSlice';
import useAppDispatch from '../components/hooks/useAppDispatch';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock, { Skeleton } from '../components/PizzaBlock';
import MyURL from '../utils/MyURL';
import Pagination from '../components/Pagination';
import SearchContext from '../components/Context';

const link = new MyURL();

const Home = () => {
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const dispatch = useAppDispatch();
    const { categoryID, currentPage, sort } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);
    const { searchValue } = React.useContext(SearchContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        link.page = currentPage;
        link.sortType = sort.type;

        if (categoryID > 0) {
            link.setCategory = categoryID;
            link.page = 1;
        } else {
            link.deleteSearParam('category');
        }

        try {
            dispatch(fetchPizzas(link.url));
            setLoading(false);
        } catch (error) {
            console.log('ERROR');
        }
        navigate(link.params.search);

        window.scrollTo(0, 0);
    }, [categoryID, currentPage, sort]);

    const pizzas = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryID} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'LOADING'
                    ? [...new Array(6)].map((elem, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Skeleton key={index} />
                      ))
                    : pizzas}
            </div>
            <Pagination />
        </>
    );
};

export default Home;
