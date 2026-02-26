import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { MessageState } from '../../../types/message';
import TaskChatMessages from './TaskChatMessages';
import SendTaskMessageForm from './SendTaskMessageForm';

type TaskChatContainerProps = {
    userId: number | null;
    taskId: number;
};

function TaskChatContainer({
    userId,
    taskId
}: TaskChatContainerProps): JSX.Element {
    const { isLoading, messages } = useAppSelector<MessageState>(state => state.messages);

    return (
        <div className='p-4 border rounded-md'>
            <TaskChatMessages
                isLoading={isLoading}
                userId={userId}
                messagesCount={messages.length}
                messages={messages}
            />

            <SendTaskMessageForm
                isLoading={isLoading}
                taskId={taskId}
            />
        </div>
    );
}

export default TaskChatContainer;