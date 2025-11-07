import { type JSX } from 'react';

function WarningMsg({ selectedUserIdsLength }: { selectedUserIdsLength: number; }): JSX.Element {
    return (
        <div className="text-center text-sm text-orange-800 rounded-md p-3 bg-orange-50 border border-orange-200">
            ⚠️ You're inviting {selectedUserIdsLength} members. This may take a moment to process.
        </div>
    );
}

export default WarningMsg;