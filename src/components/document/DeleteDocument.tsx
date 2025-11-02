import { type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { deleteProjectDocument } from '../../features/document/documentSlice';
import toast from 'react-hot-toast';

type DeleteDocumentProps = {
    projectId: number;
    setShowDocOptions: (show: boolean) => void;
};

function DeleteDocument({ projectId, setShowDocOptions }: DeleteDocumentProps): JSX.Element {
    const { isLoading } = useAppSelector(state => state.document);
    const dispatch = useAppDispatch();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete document?`)) {
            const result = await dispatch(deleteProjectDocument(projectId));

            if (result.meta.requestStatus == 'fulfilled') {
                const successMsg = result.payload as { message: string; };
                toast.success(successMsg.message);

                setShowDocOptions(false);
            }

            if (result.meta.requestStatus == 'rejected') {
                const errorMsg = result.payload || result?.meta.requestStatus;
                toast.error(errorMsg as string);
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
            {isLoading ? 'Deleting...' : 'Delete'}
        </button>
    );
}

export default DeleteDocument;