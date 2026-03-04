import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { MessageState } from '../../../types/message';
import TaskChatMessages from './TaskChatMessages';
import SendTaskMessageForm from './SendTaskMessageForm';

function TaskChatContainer({ taskId }: { taskId: number; }): JSX.Element {
    const { isLoading, messages } = useAppSelector<MessageState>(state => state.messages);

    console.log(messages);
    

    return (
        <div className='p-4 border rounded-md'>
            <TaskChatMessages
                isLoading={isLoading}
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