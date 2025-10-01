import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps {
    totalPages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
const Pagination: React.FC<PaginationProps> = ({ totalPages, setPage }) => {
  const handlePageClick = (event: {selected: number}) => {
    setPage(event.selected + 1)
 };
  return (
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={totalPages}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className={css.pagination}
        activeClassName={css.active}
      />
  )
}

export default Pagination
