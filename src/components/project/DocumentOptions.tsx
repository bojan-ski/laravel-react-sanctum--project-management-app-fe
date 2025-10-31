import { type JSX } from 'react';
import { deleteProjectDocument } from '../../services/project';

type DocumentOptionsProps = {
    document_path: string;
    projectId: string;
};

function DocumentOptions({ document_path, projectId }: DocumentOptionsProps): JSX.Element {
    return (
        <div className='mb-3 text-end'>
            <p className="text-sm font-semibold">
                Available documentation:
            </p>

            <div className='flex items-center justify-end gap-4 text-sm font-semibold'>
                <button
                    type='button'
                    className="text-blue-500 hover:underline"
                    onClick={async () => {
                        try {
                            const response = await fetch(document_path);
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = document_path.split("/").pop() ?? 'document';
                            a.click();
                            window.URL.revokeObjectURL(url);
                        } catch (error) {
                            console.error("Error downloading file:", error);
                        }
                    }}
                >
                    Download
                </button>

                <button
                    type='button'
                    className="text-red-500 hover:underline"
                    onClick={async () => {
                        try {
                            const response = await deleteProjectDocument(projectId);
                            console.log(response);

                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DocumentOptions;