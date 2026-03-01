import { useEffect, useState, type JSX } from 'react';
import { Input } from '../../ui/input';

type UsersSearchProps = {
    search: string,
    handleSearch: (term: string) => void;
};

function UsersSearch({
    search,
    handleSearch
}: UsersSearchProps): JSX.Element {
    const [ searchTerm, setSearchTerm ] = useState(search);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm !== search) handleSearch(searchTerm);
        }, 700);

        return () => clearTimeout(delay);
    }, [ searchTerm ]);

    return (
        <div className="users-search mb-4 md:mb-0">
            <Input
                min={2}
                maxLength={64}
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96"
            />
        </div>
    );
}

export default UsersSearch;