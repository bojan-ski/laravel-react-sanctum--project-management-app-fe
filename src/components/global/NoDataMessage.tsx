import type { JSX } from "react";

function NoDataMessage({ message }: { message: string; }): JSX.Element {
    return (
        <h2 className='text-3xl md:text-4xl font-bold mb-5 text-center'>
            {message}
        </h2>
    );
}

export default NoDataMessage;