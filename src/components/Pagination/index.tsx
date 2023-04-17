import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

type PaginationType = {
    onChangePage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ onChangePage }: PaginationType) => {
    return (
        <ReactPaginate
            className={style.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
