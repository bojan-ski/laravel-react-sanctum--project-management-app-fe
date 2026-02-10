import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { useThunk } from '../../hooks/useThunk';
import { downloadSelectedDocument } from '../../features/document/documentSlice';
import type { Document, DocumentState } from '../../types/document';
import toast from 'react-hot-toast';

function DownloadDocument({ document }: { document: Document; }): JSX.Element {
    const { isLoading } = useAppSelector<DocumentState>(state => state.document);
    const { run } = useThunk(downloadSelectedDocument);

    const handleDownload = async (): Promise<void> => {
        const thunkCall = await run({
            documentId: document.id,
            filename: document.doc_name
        });

        if (thunkCall.ok) {
            toast.success("Download Success");
        } else {
            toast.error(thunkCall.error.random || "Download Document Error");
        }
    };

    return (
        <button
            type='button'
            className="text-blue-500 hover:underline cursor-pointer"
            disabled={isLoading}
            onClick={handleDownload}
        >
            Download
        </button>
    );
}

export default DownloadDocument;