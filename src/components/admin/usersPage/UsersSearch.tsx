import { useEffect, useState, type JSX } from 'react';
import { Input } from '../../ui/input';

type UsersSearchProps = {
    search: string,
    handleSearch: (term: string) => void;
};

function UsersSearch({ search, handleSearch }: UsersSearchProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState(search);

    useEffect(() => {
        console.log('useEffect - UsersSearch');

        const delay = setTimeout(() => {
            if (searchTerm !== search) handleSearch(searchTerm);
        }, 700);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    return (
        <section className="users-search mb-5">
            <Input
                min={2}
                maxLength={48}
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60"
            />
        </section>
    );
}

export default UsersSearch;