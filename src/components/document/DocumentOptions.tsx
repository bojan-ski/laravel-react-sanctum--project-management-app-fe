import { type JSX } from 'react';
import type { Document } from '../../types/document';
import DownloadDocument from './DownloadDocument';
import DeleteDocument from './DeleteDocument';

type DocumentOptionsProps = {
    document: Document;
    setShowDocOptions: (show: boolean) => void;
};

function DocumentOptions({
    document,
    setShowDocOptions,
}: DocumentOptionsProps): JSX.Element {
    return (
        <div className='text-end'>
            <p className="text-xs md:text-sm font-semibold">
                Documentation:
            </p>

            <div className='flex items-center justify-end gap-4 text-xs md:text-sm font-semibold'>
                <DownloadDocument document={document} />
                <DeleteDocument
                    document={document}
                    setShowDocOptions={setShowDocOptions}
                />
            </div>
        </div>
    );
}

export default DocumentOptions;