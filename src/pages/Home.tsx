import React from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFilter } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock, { Skeleton } from '../components/PizzaBlock';
import MyURL from '../utils/MyURL';
import Pagination from '../components/Pagination';
import SearchContext from '../components/Context';

interface Ipizza {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

const link = new MyURL();

const Home = () => {
    const [items, setItems] = React.useState<Ipizza[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const { categoryID, currentPage, sort } = useSelector(selectFilter);
    const { searchValue } = React.useContext(SearchContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isLoading) {
            setLoading(true);
        }

        link.page = currentPage;
        link.sortType = sort.type;

        if (categoryID > 0) {
            link.setCategory = categoryID;
        } else {
            link.deleteSearParam('category');
        }

        axios.get(link.url).then((response) => {
            setItems(response.data);
            setLoading(false);
        });

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
                {isLoading
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
