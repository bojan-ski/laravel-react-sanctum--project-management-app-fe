import { type JSX } from 'react';
import { Button } from '../../ui/button';

type UsersTablePaginationProps = {
    total: number;
    currentPage: number;
    lastPage: number;
    handlePageChange: (num: number) => void;
};

function UsersTablePagination({ total, currentPage, lastPage, handlePageChange }: UsersTablePaginationProps): JSX.Element {
    return (
        <section className="users-pagination flex items-center justify-between mb-10">
            <p className="text-sm text-gray-600">
                Total: <span className='font-semibold'>{total}</span> users
            </p>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                <span className="flex items-center px-4 text-sm">
                    Page {currentPage} of {lastPage}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                >
                    Next
                </Button>
            </div>
        </section>
    );
}

export default UsersTablePagination;