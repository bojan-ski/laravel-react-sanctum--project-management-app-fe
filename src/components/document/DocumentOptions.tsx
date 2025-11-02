import { type JSX } from 'react';
import DownloadDocument from './DownloadDocument';
import DeleteDocument from './DeleteDocument';

type DocumentOptionsProps = {
    documentPath: string;
    projectId: number;
    setShowDocOptions: (show: boolean) => void;
};

function DocumentOptions({ documentPath, setShowDocOptions, projectId }: DocumentOptionsProps): JSX.Element {
    return (
        <div className='mb-3 text-end'>
            <p className="text-sm font-semibold">
                Available documentation:
            </p>

            <div className='flex items-center justify-end gap-4 text-sm font-semibold'>

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