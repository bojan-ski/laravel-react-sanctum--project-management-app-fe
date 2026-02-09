import { type JSX } from 'react';
import DownloadDocument from './DownloadDocument';
import DeleteDocument from './DeleteDocument';

type DocumentOptionsProps = {
    documentPath: string;
    projectId: number;
    setShowDocOptions: (show: boolean) => void;
};

function DocumentOptions({
    documentPath,
    setShowDocOptions,
    projectId
}: DocumentOptionsProps): JSX.Element {
    return (
        <div className='text-end'>
            <p className="text-xs md:text-sm font-semibold">
                Documentation:
            </p>

            <div className='flex items-center justify-end gap-4 text-xs md:text-sm font-semibold'>
                <DownloadDocument documentPath={documentPath} />
                <DeleteDocument
                    projectId={projectId}
                    setShowDocOptions={setShowDocOptions}
                />
            </div>
        </div>
    );
}

export default DocumentOptions;