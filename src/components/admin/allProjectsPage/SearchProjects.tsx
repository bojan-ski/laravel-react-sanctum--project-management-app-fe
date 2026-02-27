import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { fetchAllProjects, setAllProjectsSearch } from '../../../features/adminUser/projectSlice';
import { searchProjectsSchema, type SearchProjectsFormData } from '../../../schemas/projectSchema';
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import ResetSearch from './ResetSearch';
import toast from 'react-hot-toast';

type SearchProjectsProps = {
    isLoading: boolean;
    search: string;
};

function SearchProjects({
    isLoading,
    search
}: SearchProjectsProps): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(fetchAllProjects);
    const { validate, errors, setErrors } = useZodValidation<SearchProjectsFormData>();
    const [ searchText, setSearchText ] = useState<string>(search);

    const handleSearch = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(searchProjectsSchema, { search: searchText });
        if (!validation) return;

        dispatch(setAllProjectsSearch(searchText));

        const thunkCall = await run({
            search: searchText.trim(),
            page: 1
        });

        if (thunkCall.ok) {
            navigate(`?search=${searchText}&page=1`);

            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Send Message Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='mb-5'>
            <FormWrapper
                onSubmit={handleSearch}
                formCss='flex items-center gap-2'
            >
                <FormInput
                    name='search'
                    maxLength={255}
                    placeholder='search by project or project owner'
                    value={searchText}
                    onMutate={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    error={errors.search}
                    divCss='w-full'
                />

                <FormSubmitButton
                    loading={isLoading}
                    btnCss='border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                    btnLabel='Send'
                />

                {search && <ResetSearch isLoading={isLoading} />}
            </FormWrapper>
        </div>
    );
}

export default SearchProjects;