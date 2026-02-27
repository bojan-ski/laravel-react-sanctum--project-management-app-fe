import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import {
    fetchAllProjects,
    setAllProjectsPage,
    setAllProjectsSearch
} from '../../../features/adminUser/projectSlice';
import { Button } from '../../ui/button';

function ResetSearch({ isLoading }: { isLoading: boolean; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();

    const handleResetSearch = async (): Promise<void> => {
        dispatch(setAllProjectsSearch(''));
        dispatch(setAllProjectsPage(1));
        dispatch(fetchAllProjects({
            search: '',
            page: 1
        }));

        navigate(`/admin/projects`);
    };

    return (
        <Button
            type='reset'
            size={'default'}
            onClick={handleResetSearch}
            disabled={isLoading}
        >
            Reset
        </Button>
    );
}

export default ResetSearch;