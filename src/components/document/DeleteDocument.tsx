import { type JSX } from 'react';
import { useThunk } from '../../hooks/useThunk';
import { useAppSelector } from '../../hooks/useRedux';
import { deleteSelectedDocument } from '../../features/document/documentSlice';
import type { Document, DocumentState } from '../../types/document';
import toast from 'react-hot-toast';

type DeleteDocumentProps = {
    document: Document;
    setShowDocOptions: (show: boolean) => void;
};

function DeleteDocument({
    document,
    setShowDocOptions
}: DeleteDocumentProps): JSX.Element {
    const { isLoading } = useAppSelector<DocumentState>(state => state.document);
    const { run } = useThunk(deleteSelectedDocument);

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete document?`)) {
            const thunkCall = await run(document.id);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                setShowDocOptions(false);
            } else {
                toast.error(thunkCall.error.random || "Delete Document Error");
            }
        }
    };

    return (
        <button
            type='button'
            className="text-red-500 hover:underline cursor-pointer"
            disabled={isLoading}
            onClick={handleDelete}
        >
            Delete
        </button>
    );
}

export default DeleteDocument;