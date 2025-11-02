import { type JSX } from 'react';
import toast from 'react-hot-toast';

function DownloadDocument({ documentPath }: { documentPath: string; }): JSX.Element {
    return (
        <button
            type='button'
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={async () => {
                try {
                    const response = await fetch(documentPath);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = documentPath.split("/").pop() ?? 'document';
                    a.click();
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    toast.error("Error downloading file");
                }
            }}
        >
            Download
        </button>
    );
}

export default DownloadDocument;