import { type JSX } from 'react';
import GlobalPaginationOption from './GlobalPaginationOption';

type GlobalPaginationProps = {
    currentPage: number;
    lastPage: number;
    handlePageChange: (num: number) => void;
};

function GlobalPagination({
    currentPage,
    lastPage,
    handlePageChange
}: GlobalPaginationProps): JSX.Element {
    return (
        <section className="flex items-center justify-center gap-2 mb-10">
            <GlobalPaginationOption
                onMutate={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                label='Prev'
            />

            <span className="flex items-center px-4">
                Page {currentPage} of {lastPage}
            </span>

            <GlobalPaginationOption
                onMutate={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                label='Next'
            />
        </section>
    );
}

export default GlobalPagination;