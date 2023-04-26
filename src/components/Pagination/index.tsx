import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { handleCurrentPage } from '../../redux/slices/filterSlice';

import style from './Pagination.module.scss';

type PaginationType = {
    onChangePage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = () => {
    const dispatch = useDispatch();

    return (
        <ReactPaginate
            className={style.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) =>
                dispatch(handleCurrentPage(event.selected + 1))
            }
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
