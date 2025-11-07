import { type JSX } from 'react';
import { Checkbox } from '../../../ui/checkbox';

type SelectAllUsersProps = {
    selectedUserIdsLength: number;
    availableUsersLength: number;
    onSelectAll: () => void;
};

function SelectAllUsers({
    selectedUserIdsLength,
    availableUsersLength,
    onSelectAll
}: SelectAllUsersProps): JSX.Element {
    return (
        <div className="bg-gray-50 flex items-center justify-between p-3 rounded-md">
            <div className="flex items-center gap-2">
                <Checkbox
                    id="select-all"
                    checked={selectedUserIdsLength === availableUsersLength && availableUsersLength > 0}
                    onCheckedChange={onSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-semibold cursor-pointer">
                    Select All ({availableUsersLength})
                </label>
            </div>

            {selectedUserIdsLength > 0 && (
                <span className="text-sm font-semibold">
                    {selectedUserIdsLength} selected
                </span>
            )}
        </div>
    );
}

export default SelectAllUsers;