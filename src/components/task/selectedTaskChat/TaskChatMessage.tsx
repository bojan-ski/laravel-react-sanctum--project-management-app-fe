import { type JSX } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { deleteTaskMessage } from '../../../features/regularUser/messageSlice';
import { formatDateAdvance } from '../../../utils/helpers';
import type { Message } from '../../../types/message';
import UserAvatar from '../../global/UserAvatar';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type TaskChatMessageProps = {
    isCurrentUser: boolean;
    isLoading: boolean;
    message: Message;
};

function TaskChatMessage({
    isCurrentUser,
    isLoading,
    message
}: TaskChatMessageProps): JSX.Element {
    const { run } = useThunk(deleteTaskMessage);

    const handleDeleteTaskMessage = async () => {
        if (!confirm('Delete this message?')) return;

        const thunkCall = await run({ taskId: message.task_id, messageId: message.id });

        if (!thunkCall.ok) {
            toast.error(thunkCall.error.random || "Delete Message Error");
        }
    };    

    return (
        <div className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className='flex-shrink-0'>
                <UserAvatar
                    avatarCss='h-8 w-8'
                    name={message.user.name}
                    avatar={message.user.avatar}
                />
            </div>

            <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                {!isCurrentUser && (
                    <span className='text-xs text-gray-600 mb-1'>
                        {message.user.name}
                    </span>
                )}

                <div className={`group relative rounded-lg px-4 py-2 ${isCurrentUser
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white border border-gray-200'
                    }`}>
                    <p className='text-xs whitespace-pre-wrap break-words'>
                        {message.message}
                    </p>

                    {isCurrentUser && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDeleteTaskMessage}
                            disabled={isLoading}
                            className='absolute -top-3 -right-2 h-6 w-6 text-white bg-red-500 hover:bg-red-600 rounded-full cursor-pointer'
                        >
                            <Trash2 className='h-3 w-3' />
                        </Button>
                    )}
                </div>

                <span className='text-xs text-gray-500 mt-1'>
                    {formatDateAdvance(message.created_at)}
                </span>
            </div>
        </div>
    );
}

export default TaskChatMessage;