import React, { useContext, useMemo } from "react"
import { Context } from "../../context";
import PaginationButton from "./PaginationButton";

import styles from "./Pagination.module.scss";

type TPagination = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
}

const Pagination: React.FC<IProps & TPagination> = () => {
  const { page, setPage, totalPolicies, resultsPerPage } = useContext(Context);

  const goToNextPage = () => {
    setPage((page: number) => page + 1)
  }
  const goToPreviousPage = () => {
    setPage((page: number) => page - 1)
  }

  // calculates how many pages should show
  const pageCount = useMemo(() => {
    let count = 0;

    if (totalPolicies / resultsPerPage > 0)
      count = totalPolicies / resultsPerPage;
    if (totalPolicies % resultsPerPage > 0)
      count = count + 1;

    return count;
  }, [totalPolicies, resultsPerPage])

  return (
    <nav aria-label="Page navigation" className="flex items-center justify-center">
      {
        pageCount > 1 &&
        <button
          aria-hidden={page === 0}
          className={styles.textButton}
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          Prev
        </button>
      }
      <ul className="flex items-center gap-4">
        {Array.from({ length: pageCount }, (_, index) => {
          return (
            <li key={index}>
              <PaginationButton index={index} disabled={index === page} />
            </li>
          );
        })}
      </ul>
      {
        pageCount > 1 &&
        <button
          aria-hidden={page === pageCount - 1}
          className={styles.textButton}
          disabled={page === pageCount - 1}
          onClick={goToNextPage}
        >
          Next
        </button>
      }
    </nav>

  )

}

export default React.memo(Pagination);