import { type JSX } from 'react';
import { Button } from '../ui/button';

type GlobalPaginationOptionProps = {
    onMutate: () => void;
    disabled: boolean;
    label: string;
};

function GlobalPaginationOption({
    onMutate,
    disabled,
    label
}: GlobalPaginationOptionProps): JSX.Element {
    return (
        <Button
            className='font-semibold text-white hover:text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer'
            variant="outline"
            onClick={onMutate}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}

export default GlobalPaginationOption;