import { type JSX } from 'react';

function Loading(): JSX.Element {
    return (
        <div className="flex h-full w-full items-center justify-center mt-52">
            <div className="h-40 w-40 animate-spin rounded-full border-4 border-gray-800 border-t-transparent shadow-lg"></div>
        </div>
    );
}

export default Loading;