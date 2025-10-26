import { type JSX } from 'react';

function ErrorMessage({ error }: { error: string; }): JSX.Element {
    return (
        <h2 className='text-5xl font-bold my-10 text-center'>
            {error}
        </h2>
    );
}

export default ErrorMessage;